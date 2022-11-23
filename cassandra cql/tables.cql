CREATE KEYSPACE messages WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE messages;

CREATE TABLE users_by_id(
    id_user TEXT PRIMARY KEY,
    username TEXT,
    custom_username TEXT,
    email TEXT,
    password TEXT,
    register_date TIMESTAMP,
);

CREATE TABLE users_by_email(
    email TEXT PRIMARY KEY,
    id_user TEXT,
    username TEXT,
    custom_username TEXT,
    password TEXT,
    register_date TIMESTAMP,
);

CREATE TABLE users_by_username(
    username TEXT PRIMARY KEY,
    id_user TEXT,
    custom_username TEXT,
    email TEXT,
    password TEXT,
    register_date TIMESTAMP,
);

CREATE TABLE users_by_rols(
    id_user TEXT,
    id_channel TEXT,
    id_rol TEXT,
    PRIMARY KEY ((id_user, id_channel), id_rol)
);

CREATE TABLE rols_by_id(
    id_channel TEXT,
    id_rol TEXT,
    create_at TIMESTAMP,
    description TEXT,
    rol_name TEXT,
    PRIMARY KEY ((id_channel, id_rol))
);

CREATE TABLE channels_by_id(
    id_channel TEXT PRIMARY KEY,
    name TEXT,
    create_at TIMESTAMP,
    custom_url TEXT,
    description TEXT,
    id_creator TEXT
);

CREATE TABLE channels_by_url(
    custom_url TEXT PRIMARY KEY,
    id_channel TEXT,
    name TEXT,
    create_at TIMESTAMP,
    description TEXT,
    id_creator TEXT
);

CREATE TABLE channels_by_rols(
    id_channel TEXT,
    id_rol TEXT,
    create_at TIMESTAMP,
    description TEXT,
    PRIMARY KEY (id_channel, id_rol)
);

CREATE TABLE channels_by_users(
    id_channel TEXT,
    id_user TEXT,
    custom_username TEXT,
    username TEXT,
    joined TIMESTAMP,
    PRIMARY KEY (id_channel, id_user)
);

CREATE TABLE messages_by_id(
    id_message TEXT,
    id_channel TEXT,
    create_at TIMESTAMP,
    content TEXT,
    id_author TEXT,
    PRIMARY KEY ((id_message, id_channel), create_at)
);

CREATE TABLE messages_by_channel(
    id_message TEXT,
    id_channel TEXT,
    create_at TIMESTAMP,
    content TEXT,
    id_author TEXT,
    PRIMARY KEY (id_channel, id_message, create_at)
);

/*
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('1', '1', '2022-11-23 16:15:38.336000','hola 1');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('2', '1', '2022-11-23 16:15:39.336000','hola 2');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('3', '1', '2022-11-23 16:15:40.336000','hola 3');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('4', '1', '2022-11-23 16:15:42.336000','hola 4');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('5', '2', '2022-11-23 16:15:44.336000','hola 5');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('6', '2', '2022-11-23 16:15:45.336000','hola 6');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('7', '2', '2022-11-23 16:15:46.336000','hola 7');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('8', '2', '2022-11-23 16:15:47.336000','hola 8');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('9', '2', '2022-11-23 16:15:53.336000','hola 9');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('10', '3', '2022-11-23 16:16:01.336000','hola 10');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('11', '3', '2022-11-23 16:16:12.336000','hola 11');
INSERT INTO mensaje_id(id_mensaje, id_canal, date, contenido) VALUES ('12', '3', '2022-11-23 16:16:15.336000','hola 12');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('1', '1', '2022-11-23 16:15:38.336000','hola 1');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('2', '1', '2022-11-23 16:15:39.336000','hola 2');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('3', '1', '2022-11-23 16:15:40.336000','hola 3');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('4', '1', '2022-11-23 16:15:42.336000','hola 4');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('5', '2', '2022-11-23 16:15:44.336000','hola 5');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('6', '2', '2022-11-23 16:15:45.336000','hola 6');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('7', '2', '2022-11-23 16:15:46.336000','hola 7');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('8', '2', '2022-11-23 16:15:47.336000','hola 8');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('9', '2', '2022-11-23 16:15:53.336000','hola 9');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('10', '3', '2022-11-23 16:16:01.336000','hola 10');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('11', '3', '2022-11-23 16:16:12.336000','hola 11');
INSERT INTO mensaje_by_canal(id_mensaje, id_canal, date, contenido) VALUES ('12', '3', '2022-11-23 16:16:15.336000','hola 12');
*/