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
