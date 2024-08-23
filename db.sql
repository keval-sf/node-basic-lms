--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-08-23 11:25:03 IST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 7 (class 2615 OID 8861469)
-- Name: common.master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "common.master";


ALTER SCHEMA "common.master" OWNER TO postgres;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 6 (class 2615 OID 8861442)
-- Name: users.master; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "users.master";


ALTER SCHEMA "users.master" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 8861471)
-- Name: roles; Type: TABLE; Schema: common.master; Owner: postgres
--

CREATE TABLE "common.master".roles (
    "roleId" integer NOT NULL,
    "roleName" character varying(100) NOT NULL,
    "updatedAt" timestamp without time zone,
    "createdAt" timestamp without time zone
);


ALTER TABLE "common.master".roles OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 8861470)
-- Name: roles_roleid_seq; Type: SEQUENCE; Schema: common.master; Owner: postgres
--

CREATE SEQUENCE "common.master".roles_roleid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "common.master".roles_roleid_seq OWNER TO postgres;

--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 223
-- Name: roles_roleid_seq; Type: SEQUENCE OWNED BY; Schema: common.master; Owner: postgres
--

ALTER SEQUENCE "common.master".roles_roleid_seq OWNED BY "common.master".roles."roleId";


--
-- TOC entry 218 (class 1259 OID 8861434)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    userid integer NOT NULL,
    name text NOT NULL,
    phone text,
    email text NOT NULL,
    usertype text NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 8861433)
-- Name: user_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_userid_seq OWNER TO postgres;

--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_userid_seq OWNED BY public."user".userid;


--
-- TOC entry 222 (class 1259 OID 8861465)
-- Name: customers; Type: TABLE; Schema: users.master; Owner: postgres
--

CREATE TABLE "users.master".customers (
    "customerId" integer NOT NULL,
    name character varying(100) NOT NULL,
    website character varying(255),
    "roleId" integer NOT NULL,
    "userId" integer,
    "updatedAt" timestamp without time zone,
    "createdAt" timestamp without time zone
);


ALTER TABLE "users.master".customers OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 8861464)
-- Name: customers_customerid_seq; Type: SEQUENCE; Schema: users.master; Owner: postgres
--

CREATE SEQUENCE "users.master".customers_customerid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "users.master".customers_customerid_seq OWNER TO postgres;

--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 221
-- Name: customers_customerid_seq; Type: SEQUENCE OWNED BY; Schema: users.master; Owner: postgres
--

ALTER SEQUENCE "users.master".customers_customerid_seq OWNED BY "users.master".customers."customerId";


--
-- TOC entry 220 (class 1259 OID 8861455)
-- Name: users; Type: TABLE; Schema: users.master; Owner: postgres
--

CREATE TABLE "users.master".users (
    "userId" integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "updatedAt" timestamp without time zone,
    "createdAt" timestamp without time zone
);


ALTER TABLE "users.master".users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 8861454)
-- Name: users_userid_seq; Type: SEQUENCE; Schema: users.master; Owner: postgres
--

CREATE SEQUENCE "users.master".users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "users.master".users_userid_seq OWNER TO postgres;

--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: users.master; Owner: postgres
--

ALTER SEQUENCE "users.master".users_userid_seq OWNED BY "users.master".users."userId";


--
-- TOC entry 3463 (class 2604 OID 8861474)
-- Name: roles roleId; Type: DEFAULT; Schema: common.master; Owner: postgres
--

ALTER TABLE ONLY "common.master".roles ALTER COLUMN "roleId" SET DEFAULT nextval('"common.master".roles_roleid_seq'::regclass);


--
-- TOC entry 3460 (class 2604 OID 8861437)
-- Name: user userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN userid SET DEFAULT nextval('public.user_userid_seq'::regclass);


--
-- TOC entry 3462 (class 2604 OID 8861468)
-- Name: customers customerId; Type: DEFAULT; Schema: users.master; Owner: postgres
--

ALTER TABLE ONLY "users.master".customers ALTER COLUMN "customerId" SET DEFAULT nextval('"users.master".customers_customerid_seq'::regclass);


--
-- TOC entry 3461 (class 2604 OID 8861458)
-- Name: users userId; Type: DEFAULT; Schema: users.master; Owner: postgres
--

ALTER TABLE ONLY "users.master".users ALTER COLUMN "userId" SET DEFAULT nextval('"users.master".users_userid_seq'::regclass);


--
-- TOC entry 3625 (class 0 OID 8861471)
-- Dependencies: 224
-- Data for Name: roles; Type: TABLE DATA; Schema: common.master; Owner: postgres
--

COPY "common.master".roles ("roleId", "roleName", "updatedAt", "createdAt") FROM stdin;
1	Super Admin	\N	\N
2	Admin	\N	\N
3	Supervisor	\N	\N
4	User	\N	\N
\.


--
-- TOC entry 3619 (class 0 OID 8861434)
-- Dependencies: 218
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (userid, name, phone, email, usertype) FROM stdin;
\.


--
-- TOC entry 3623 (class 0 OID 8861465)
-- Dependencies: 222
-- Data for Name: customers; Type: TABLE DATA; Schema: users.master; Owner: postgres
--

COPY "users.master".customers ("customerId", name, website, "roleId", "userId", "updatedAt", "createdAt") FROM stdin;
11	John White	\N	3	19	\N	\N
13	Michle Black	google.com	1	19	2024-08-23 05:53:55.616	2024-08-23 05:53:55.616
\.


--
-- TOC entry 3621 (class 0 OID 8861455)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: users.master; Owner: postgres
--

COPY "users.master".users ("userId", name, email, "updatedAt", "createdAt") FROM stdin;
19	John White	email1@gmail.com	\N	\N
\.


--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 223
-- Name: roles_roleid_seq; Type: SEQUENCE SET; Schema: common.master; Owner: postgres
--

SELECT pg_catalog.setval('"common.master".roles_roleid_seq', 4, true);


--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_userid_seq', 1, false);


--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 221
-- Name: customers_customerid_seq; Type: SEQUENCE SET; Schema: users.master; Owner: postgres
--

SELECT pg_catalog.setval('"users.master".customers_customerid_seq', 13, true);


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: users.master; Owner: postgres
--

SELECT pg_catalog.setval('"users.master".users_userid_seq', 19, true);


--
-- TOC entry 3472 (class 2606 OID 8861481)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: common.master; Owner: postgres
--

ALTER TABLE ONLY "common.master".roles
    ADD CONSTRAINT roles_pk PRIMARY KEY ("roleId");


--
-- TOC entry 3465 (class 2606 OID 8861441)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (userid);


--
-- TOC entry 3470 (class 2606 OID 8861483)
-- Name: customers customers_pk; Type: CONSTRAINT; Schema: users.master; Owner: postgres
--

ALTER TABLE ONLY "users.master".customers
    ADD CONSTRAINT customers_pk PRIMARY KEY ("customerId");


--
-- TOC entry 3468 (class 2606 OID 8861462)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: users.master; Owner: postgres
--

ALTER TABLE ONLY "users.master".users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- TOC entry 3466 (class 1259 OID 8861463)
-- Name: users_email_idx; Type: INDEX; Schema: users.master; Owner: postgres
--

CREATE UNIQUE INDEX users_email_idx ON "users.master".users USING btree (email);


--
-- TOC entry 3473 (class 2606 OID 8861475)
-- Name: customers customer_user_fk; Type: FK CONSTRAINT; Schema: users.master; Owner: postgres
--

ALTER TABLE ONLY "users.master".customers
    ADD CONSTRAINT customer_user_fk FOREIGN KEY ("userId") REFERENCES "users.master".users("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3474 (class 2606 OID 8861484)
-- Name: customers customers_roles_fk; Type: FK CONSTRAINT; Schema: users.master; Owner: postgres
--

ALTER TABLE ONLY "users.master".customers
    ADD CONSTRAINT customers_roles_fk FOREIGN KEY ("roleId") REFERENCES "common.master".roles("roleId") ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-08-23 11:25:03 IST

--
-- PostgreSQL database dump complete
--

