CREATE TABLE public."user" (
	id serial NOT NULL,
	username varchar(20) NOT NULL,
	"password" bpchar(32) NOT NULL,
	"name" varchar(20) NOT NULL,
	dept_id int4 NOT NULL,
	remark varchar(100) NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.common (
	id serial NOT NULL,
    master_id int4 NOT NULL,
    k varchar(20) NOT NULL,
    v varchar(50) NOT NULL,
    remark varchar(200) NOT NULL,
    CONSTRAINT dept_pk PRIMARY KEY (id)
);

CREATE TABLE himawari.archive (
	id serial NOT NULL,
	sn varchar(20) NOT NULL,
	sn_alt varchar(100) NOT NULL,
	"identity" varchar(18) NOT NULL,
	"name" varchar(20) NOT NULL,
	birthday varchar(20) NOT NULL,
	cangongshijian varchar(20) NOT NULL,
	zhicheng varchar(20) NOT NULL,
	gongling varchar(10) NOT NULL,
	yutuixiuriqi varchar(20) NOT NULL,
	tuixiuriqi varchar(20) NOT NULL,
	remark varchar(100) NOT NULL,
	vault_id int4 NOT NULL,
	phone varchar(20) NOT NULL DEFAULT ''::character varying,
	CONSTRAINT archive_pk PRIMARY KEY (id)
);

CREATE TABLE himawari.archive_isolate (
	id serial NOT NULL,
	sn varchar(20) NOT NULL DEFAULT ''::character varying,
	sn_alt varchar(100) NOT NULL DEFAULT ''::character varying,
	"identity" varchar(18) NOT NULL DEFAULT ''::character varying,
	"name" varchar(20) NOT NULL DEFAULT ''::character varying,
	birthday varchar(20) NOT NULL DEFAULT ''::character varying,
	cangongshijian varchar(20) NOT NULL DEFAULT ''::character varying,
	zhicheng varchar(20) NOT NULL DEFAULT ''::character varying,
	gongling varchar(10) NOT NULL DEFAULT ''::character varying,
	yutuixiuriqi varchar(20) NOT NULL DEFAULT ''::character varying,
	tuixiuriqi varchar(20) NOT NULL DEFAULT ''::character varying,
	remark varchar(100) NOT NULL DEFAULT ''::character varying,
	vault_id int4 NOT NULL DEFAULT 0,
	original_id int4 NOT NULL DEFAULT 0,
	reason varchar(20) NOT NULL DEFAULT ''::character varying,
	phone varchar(20) NOT NULL DEFAULT ''::character varying,
	CONSTRAINT archive_isolate_pk PRIMARY KEY (id)
);

CREATE TABLE himawari.auth (
	id serial NOT NULL,
	user_id int4 NOT NULL,
	super int2 NOT NULL,
	CONSTRAINT auth_pk PRIMARY KEY (id)
);

CREATE TABLE himawari.picture (
	id serial NOT NULL,
	master_id int4 NOT NULL,
	"content" text NOT NULL,
	CONSTRAINT picture_pk PRIMARY KEY (id)
);

CREATE TABLE himawari.vault (
	id serial NOT NULL,
	"name" varchar(20) NOT NULL,
	addr varchar(100) NOT NULL,
	phone varchar(20) NOT NULL,
	CONSTRAINT vault_pk PRIMARY KEY (id)
);
