CREATE TABLE `roles` (
    `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `is_system` BOOLEAN NOT NULL DEFAULT FALSE,
    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user_roles` (
    `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `user_id` INT NOT NULL,
    `role_id` INT NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
    `login` VARCHAR(64) NOT NULL UNIQUE,
    `password` VARCHAR(72),
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `auth_source` INT NOT NULL DEFAULT 1,
    `active` BOOLEAN NOT NULL DEFAULT TRUE,
    `created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` DATETIME ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO users(`login`,`password`,`full_name`, `email`) VALUES ('admin', '$2a$12$C8s9LQfFrpuA9J8Ri2LMy.zJvvkkwNFVa0jkigr9wejyWmRQAuyb2', 'Администратор', 'ripo@zdmail.ru');
INSERT INTO roles(`name`,`title`, `is_system`) VALUES ('admin', N'Администратор', 1),('user', N'Пользователь', 1),('creator', N'Контент-менеджер', 1);
INSERT INTO user_roles(`user_id`,`role_id`) VALUES (1, 1);
