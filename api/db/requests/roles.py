get_roles_sql_request = """SELECT *
                           FROM `roles`
                           LIMIT %s
                           OFFSET %s"""

get_role_sql_request = """SELECT *
                          FROM `roles`
                          WHERE id=%s"""

get_role_name_sql_request = """SELECT *
                               FROM `roles`
                               WHERE name=%s"""

set_role_sql_request = """INSERT INTO `roles`
                          (name, title, description, active, is_system)
                          VALUES (%s,%s,%s,%s,%s)"""

update_role_sql_request = """UPDATE `roles`
                             SET name=%s,
                                 title=%s,
                                 description=%s,
                                 active=%s,
                                 is_system=%s
                             WHERE id=%s"""

delete_role_sql_request = """DELETE FROM `roles`
                             WHERE id=%s"""

delete_role_acl_sql_request = """DELETE FROM `layer_acl`
                                 WHERE role_id=%s"""

get_role_ids_sql_request = """SELECT *
                              FROM roles"""

get_role_id_sql_request = """SELECT id
                             FROM roles
                             WHERE name=%s"""