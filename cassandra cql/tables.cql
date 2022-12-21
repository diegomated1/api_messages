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

CREATE MATERIALIZED VIEW users_by_email 
AS SELECT * FROM users_by_id
WHERE id_user IS NOT NULL AND email IS NOT NULL
PRIMARY KEY (email, id_user);

CREATE MATERIALIZED VIEW users_by_username
AS SELECT * FROM users_by_id
WHERE id_user IS NOT NULL AND username IS NOT NULL
PRIMARY KEY (username, id_user);

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

CREATE MATERIALIZED VIEW channels_by_url 
AS SELECT * FROM channels_by_id 
WHERE id_channel IS NOT NULL AND custom_url IS NOT NULL
PRIMARY KEY (custom_url, id_channel);

CREATE TABLE channels_by_rols(
    id_channel TEXT,
    id_rol TEXT,
    create_at TIMESTAMP,
    description TEXT,
    PRIMARY KEY (id_channel, id_rol)
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

CREATE TABLE members_by_channels(
    id_user TEXT,
    id_channel TEXT,
    joined TIMESTAMP,
    PRIMARY KEY (id_channel, id_user)
);

CREATE MATERIALIZED VIEW members_by_users 
AS SELECT * FROM members_by_channels 
WHERE id_user IS NOT NULL AND id_channel IS NOT NULL
PRIMARY KEY (id_user, id_channel);