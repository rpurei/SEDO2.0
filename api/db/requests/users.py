get_user_sql_request = """SELECT *
                          FROM `users`
                          WHERE login=%s"""

get_user_id_sql_request = """SELECT *
                             FROM `users`
                             WHERE id=%s"""

set_user_ldap_sql_request = """INSERT INTO `users` (login,full_name,email,auth_source)
                           VALUES (%s,%s,%s,%s)"""

set_user_local_sql_request = """INSERT INTO `users` (login,password,full_name,email,auth_source)
                            VALUES (%s,%s,%s,%s,%s)"""

set_user_role_sql_request = """INSERT INTO `user_roles` (user_id, role_id) 
                               VALUES (%s,%s)"""

update_user_wpass_sql_request = """UPDATE `users`
                                   SET password=%s,
                                       active=%s
                                   WHERE id=%s"""

update_user_sql_request = """UPDATE `users`
                             SET active=%s
                             WHERE id=%s"""

delete_user_roles_sql_request = """DELETE FROM `user_roles`
                                   WHERE user_id=%s"""

delete_user_sql_request = """DELETE FROM `users`
                             WHERE id=%s"""

get_user_roles_sql_request = """SELECT r.name
                                FROM `users`
                                LEFT JOIN user_roles ur on users.id = ur.user_id
                                LEFT JOIN roles r on ur.role_id = r.id
                                WHERE login=%s"""

get_users_sql_request = """SELECT *
                           FROM `users`
                           LIMIT %s
                           OFFSET %s"""
