CREATE KEYSPACE messages WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE messages;

CREATE TABLE users_by_id(
    id_user BIGINT PRIMARY KEY,
    username TEXT,
    custom_username TEXT,
    email TEXT,
    password TEXT,
    register_date TIMESTAMP,
);

CREATE TABLE users_by_email(
    email TEXT PRIMARY KEY,
    id_user BIGINT PRIMARY KEY,
    username TEXT,
    custom_username TEXT,
    password TEXT,
    register_date TIMESTAMP,
);

CREATE TABLE users_by_username(
    username TEXT PRIMARY KEY,
    id_user BIGINT,
    custom_username TEXT,
    email TEXT,
    password TEXT,
    register_date TIMESTAMP,
);

CREATE TABLE users_by_rols(
    id_user BIGINT,
    id_channel BIGINT,
    id_rol BIGINT,
    PRIMARY KEY ((id_user, id_channel), id_rol)
);

CREATE TABLE rols_by_id(
    id_channel BIGINT,
    id_rol BIGINT,
    create_at TIMESTAMP,
    description TEXT,
    rol_name TEXT,
    PRIMARY KEY ((id_channel, id_rol))
);

CREATE TABLE channels_by_id(
    id_channel BIGINT PRIMARY KEY,
    name TEXT,
    create_at TIMESTAMP,
    custom_url TEXT,
    description TEXT,
    id_creator BIGINT
);

CREATE TABLE channels_by_url(
    custom_url TEXT PRIMARY KEY,
    id_channel BIGINT,
    name TEXT,
    create_at TIMESTAMP,
    description TEXT,
    id_creator BIGINT
);

CREATE TABLE channels_by_rols(
    id_channel BIGINT,
    id_rol BIGINT,
    create_at TIMESTAMP,
    description TEXT,
    PRIMARY KEY (id_channel, id_rol)
);

CREATE TABLE channels_by_users(
    id_channel BIGINT,
    id_user BIGINT,
    custom_username TEXT,
    username TEXT,
    joined TIMESTAMP,
    PRIMARY KEY (id_channel, id_user)
);

CREATE TABLE messages_by_id(
    id_message BIGINT,
    id_channel BIGINT,
    create_at TIMESTAMP,
    content TEXT,
    id_author BIGINT,
    PRIMARY KEY ((id_message, id_channel), create_at)
);

CREATE TABLE messages_by_channel(
    id_message BIGINT,
    id_channel BIGINT,
    create_at TIMESTAMP,
    content TEXT,
    id_author BIGINT,
    PRIMARY KEY (id_channel, id_message, create_at)
);
