import axios, {getJWTBodyData} from "../plugins/axios";
// import {isNotEmptyObject} from "../functions/is";
import router from '../router';
import {UserModel} from '../models/UserModel';

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const CHECK_AUTH = "CHECK_AUTH";
const GROUP_PERMISSIONS_LIST = "GROUP_PERMISSIONS_LIST";
const USER_LIST = "USER_LIST";
const GROUP_SAVE = "GROUP_SAVE";
const GROUP_PERMISSION_SAVE = "GROUP_PERMISSION_SAVE";
const USER_SAVE = "USER_SAVE";
const USER_GROUP_SAVE = "USER_GROUP_SAVE";

const users = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        currentUser: {},
        groups: [],
        permissions: [],
        users: []
    },
    mutations: {
        LOGIN(state, authInfo) {
            localStorage.setItem('token', authInfo.access);
            localStorage.setItem('refresh', authInfo.refresh);
        },
        LOGOUT(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            state.isAuthenticated = false;
        },
        CHECK_AUTH(state, data) {
            state.isAuthenticated = true;
            state.currentUser = new UserModel().deserialize(data.user);
            state.users = data.users.map(user => new UserModel().deserialize(user));
            state.groups = data.info.groups;
            state.permissions = data.info.permissions;
        },
        GROUP_PERMISSIONS_LIST(state, data) {
            state.groups = data.groups;
            state.permissions = data.permissions;
        },
        GROUP_SAVE(state, savedGroup) {
            const groups = state.groups;
            const foundGroup = groups.find(group => group.id === savedGroup.id);
            if (foundGroup) {
                Object.assign(foundGroup, savedGroup);
            } else {
                groups.push(savedGroup);
            }
            state.groups = groups;
        },
        GROUP_PERMISSION_SAVE(state, payload) {
            state.groups = state.groups.map(group => {
                if (group.id === payload.groupId) {
                    if (payload.isChecked) {
                        group.permissions.push(payload.permissionId)
                    } else {
                        group.permissions = group.permissions
                          .filter(permId => permId !== payload.permissionId)
                    }
                }
                return group;
            })
        },
        USER_LIST(state, data) {
            state.users = data.users.map(user =>
              new UserModel().deserialize(user));
        },
        USER_SAVE(state, savedUser) {
            const users = state.users;
            const foundUser = users.find(user => user.id === savedUser.id);
            if (foundUser) {
                Object.assign(foundUser, savedUser);
            } else {
                users.push(savedUser);
            }
            state.users = users;
        },
        USER_GROUP_SAVE(state, payload) {
            state.users = state.users.map(user => {
                if (user.id === payload.userId) {
                    if (payload.isChecked) {
                        user.groups.push(payload.groupId)
                    } else {
                        user.groups = user.groups
                          .filter(groupId => groupId !== payload.groupId)
                    }
                }
                return user;
            })
        },
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        getGroups: state => state.groups,
        getUsers: state => state.users,
        getCurrentUser: state => state.currentUser,
        getGroupById: (state) => {
            return (id) => state.groups.find(gr => gr.id === parseInt(id))
        },
        getContentPermissions: state => (id) => {
            const group = state.groups.find(gr => gr.id === parseInt(id));
            const list = [];
            if (group) {
                let contentTypeId = null;
                let temp = Object.assign({}, {
                    name: '',
                    permissions: []
                });
                const setContentPerms = (perm) => {
                    const codename = perm.codename.split('_');
                    temp.name = codename[1];
                    temp.permissions.push({
                        id: perm.id,
                        action: codename[0],
                        isChecked: group.permissions.includes(perm.id)
                    });
                };
                state.permissions.map((perm, i) => {
                    if (i === 0) { contentTypeId = perm.content_type_id } // инициализируем contentTypeId
                    if (contentTypeId === perm.content_type_id) {
                        setContentPerms(perm);
                        if (i === (state.permissions.length-1)) { list.push(temp) }
                    } else {
                        list.push(temp);
                        temp = Object.assign({}, {
                            name: '',
                            permissions: []
                        });
                        contentTypeId = perm.content_type_id;
                        setContentPerms(perm);
                    }
                });
            }
            return list;
        },
        getUserById: (state) => {
            return (id) => state.users.find(user => user.id === id)
        },
        getUserGroups: state => (id) => {
            const user = state.users.find(user => user.id === id);
            const groups = state.groups;
            if (user) {
                groups.forEach(group => {
                    group.isChecked = user.groups.includes(group.id);
                });
            }
            return groups;
        }
    },
    actions: {
        async login({ commit }, payload) {
            return await new Promise((resolve, reject) => {
                axios.post('/admin/token/', getJWTBodyData(payload))
                    .then(response => {
                        commit(LOGIN, response.data);
                        resolve(response);
                    }, error => {
                        reject(error);
                    })
            });
        },
        logout({ commit }) {
            commit(LOGOUT);
            delete axios.defaults.headers.common['Authorization'];
            router.replace({name: 'login'})
        },
        async checkAuth({ commit }) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            await axios.post('/admin/check-auth/')
              .then(response => {
                  commit(CHECK_AUTH, response.data);
              })
              .catch(error => {console.log(error);});
        },
        fetchGroups({ commit }) {
            axios.get('/admin/groups-permissions-list/')
                .then(response => {
                    const data = response.data;
                    commit(GROUP_PERMISSIONS_LIST, data.info);
                })
                .catch(error => console.log(error));
        },
        fetchUsers({ commit }) {
            axios.get('/admin/users/')
              .then(response => {
                  const data = response.data;
                  commit(USER_LIST, data);
              })
              .catch(error => console.log(error));
        },
        groupSave({ commit }, payload) {
            return new Promise((resolve, reject) => {
                const method = payload.id ? 'put' : 'post';
                axios[method]('/admin/group-save/', {
                    group: payload
                }).then(response => {
                    const data = response.data;
                    commit(GROUP_SAVE, data.group);
                    resolve(response);
                }, error => {
                    reject(error);
                })
            });
        },
        groupPermissionSave({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/admin/group-permission-save/', {
                    group_id: payload.groupId,
                    permission_id: payload.permissionId,
                    is_checked: payload.isChecked,
                }).then(response => {
                    commit(GROUP_PERMISSION_SAVE, payload);
                    resolve(response);
                }, error => {
                    reject(error);
                })
            });
        },
        userSave({ commit }, user) {
            return new Promise((resolve, reject) => {
                const method = user.id ? 'put' : 'post';
                axios[method]('/admin/users/save/', {
                    user: new UserModel().serialize(user)
                }).then(response => {
                    const data = response.data;
                    commit(USER_SAVE, new UserModel().deserialize(data.user));
                    resolve(response);
                }, error => {
                    reject(error);
                })
            });
        },
        userGroupSave({ commit }, payload) {
            return new Promise((resolve, reject) => {
                axios.post('/admin/user-group-save/', {
                    user_id: payload.userId,
                    group_id: payload.groupId,
                    is_checked: payload.isChecked,
                }).then(response => {
                    commit(USER_GROUP_SAVE, payload);
                    resolve(response);
                }, error => {
                    reject(error);
                })
            });
        },
    }
};

export default users;
