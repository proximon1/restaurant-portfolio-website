--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_users (
    id integer NOT NULL,
    username text NOT NULL,
    password_hash text NOT NULL
);


ALTER TABLE public.admin_users OWNER TO postgres;

--
-- Name: admin_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admin_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_users_id_seq OWNER TO postgres;

--
-- Name: admin_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admin_users_id_seq OWNED BY public.admin_users.id;


--
-- Name: landing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.landing (
    id integer NOT NULL,
    main_video_horizontal text,
    about_image_small text,
    about_image_large text,
    about_video text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    about_description text,
    main_video_vertical text
);


ALTER TABLE public.landing OWNER TO postgres;

--
-- Name: landing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.landing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.landing_id_seq OWNER TO postgres;

--
-- Name: landing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.landing_id_seq OWNED BY public.landing.id;


--
-- Name: page_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_sessions (
    id integer NOT NULL,
    started_at timestamp without time zone NOT NULL,
    ended_at timestamp without time zone,
    duration_seconds integer,
    ip character varying(45),
    last_activity_at timestamp without time zone
);


ALTER TABLE public.page_sessions OWNER TO postgres;

--
-- Name: page_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.page_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.page_sessions_id_seq OWNER TO postgres;

--
-- Name: page_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.page_sessions_id_seq OWNED BY public.page_sessions.id;


--
-- Name: project_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_items (
    id integer NOT NULL,
    project_id integer,
    "image-url" text,
    is_main boolean,
    description text,
    note_order integer,
    layout text
);


ALTER TABLE public.project_items OWNER TO postgres;

--
-- Name: COLUMN project_items.is_main; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.project_items.is_main IS 'The picture is the main picture of the project, or not';


--
-- Name: project_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.project_items_id_seq OWNER TO postgres;

--
-- Name: project_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_items_id_seq OWNED BY public.project_items.id;


--
-- Name: project_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_tags (
    project_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.project_tags OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    subtitle text
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: admin_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users ALTER COLUMN id SET DEFAULT nextval('public.admin_users_id_seq'::regclass);


--
-- Name: landing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landing ALTER COLUMN id SET DEFAULT nextval('public.landing_id_seq'::regclass);


--
-- Name: page_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_sessions ALTER COLUMN id SET DEFAULT nextval('public.page_sessions_id_seq'::regclass);


--
-- Name: project_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_items ALTER COLUMN id SET DEFAULT nextval('public.project_items_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_users (id, username, password_hash) FROM stdin;
1	ratadmin	$2b$10$z2L9D2bwKxT8.G5U70fG1.Do.W.aTvZkv/5m0u1rKqbGxpL8kAIMu
\.


--
-- Data for Name: landing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.landing (id, main_video_horizontal, about_image_small, about_image_large, about_video, created_at, about_description, main_video_vertical) FROM stdin;
1	/images/landing/mainhorizontal.mp4	/images/landing/img3864.jpg	/images/landing/aaboutpictureright.png	/images/landing/aaboutus.gif	2026-04-06 23:09:06.6185	RAT is a food design studio exploring the delicate intersection between food, art, architecture, and design, proposing a culinary experience conceived as a performance. We believe that food is the most democratic art medium. Every person, every day, is confronted with the question of what to eat, why, and how that choice can have an impact on health, the world, the environment and society.\r\n\r\nPrecisely because of its immediacy, food becomes a powerful creative practice, a tool to generate reflections on other artistic expressions, which we explore through an interdisciplinary approach, where dishes and tablescapes are not thought as mere surfaces to decorate, but as spaces to inhabit. Each culinary scenario is a carefully constructed microcosm where taste, matter, and storytelling coexist.	/images/landing/avertical.mp4
\.


--
-- Data for Name: page_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_sessions (id, started_at, ended_at, duration_seconds, ip, last_activity_at) FROM stdin;
35	2026-04-29 23:28:16.975229	2026-04-29 23:49:08.950628	1252	::1	\N
36	2026-04-29 23:49:08.973413	2026-04-29 23:49:59.251883	50	::1	\N
37	2026-04-29 23:49:59.289311	2026-04-29 23:50:01.345082	2	::1	\N
66	2026-05-04 18:45:41.422645	2026-05-04 18:47:34.702304	113	::1	\N
67	2026-05-04 18:47:34.737286	2026-05-04 18:47:42.859529	8	::1	\N
68	2026-05-04 18:47:42.904301	2026-05-04 18:47:54.422758	12	::1	\N
69	2026-05-04 18:47:54.459654	2026-05-04 18:47:59.014915	5	::1	\N
70	2026-05-04 18:47:59.040952	2026-05-04 18:48:57.903926	59	::1	\N
39	2026-04-30 00:17:22.382059	\N	\N	::1	\N
71	2026-05-04 18:48:58.007792	2026-05-04 18:49:00.668751	3	::1	\N
72	2026-05-04 18:49:00.734437	2026-05-04 18:49:26.996136	26	::1	\N
38	2026-04-29 23:50:01.374422	2026-04-30 00:42:55.358521	3174	::1	\N
73	2026-05-04 18:49:27.060072	2026-05-04 18:50:01.583613	35	::1	\N
41	2026-05-04 18:26:21.95456	\N	\N	::1	\N
40	2026-05-04 18:24:47.983403	2026-05-04 18:31:05.093393	377	::1	\N
42	2026-05-04 18:31:05.152634	2026-05-04 18:31:07.355415	2	::1	\N
43	2026-05-04 18:31:07.376093	2026-05-04 18:32:58.297053	111	::1	\N
44	2026-05-04 18:32:58.357756	2026-05-04 18:33:09.900809	12	::1	\N
74	2026-05-04 18:50:01.641384	2026-05-04 18:50:25.227609	24	::1	\N
45	2026-05-04 18:33:09.932843	2026-05-04 18:33:26.663601	17	::1	\N
46	2026-05-04 18:33:26.736481	2026-05-04 18:33:34.174644	7	::1	\N
47	2026-05-04 18:33:34.218192	2026-05-04 18:34:06.664253	32	::1	\N
48	2026-05-04 18:34:06.690156	2026-05-04 18:34:17.101906	10	::1	\N
75	2026-05-04 18:50:25.304337	2026-05-04 18:50:32.494473	7	::1	\N
49	2026-05-04 18:34:17.139976	2026-05-04 18:36:55.496333	158	::1	\N
27	2026-04-29 15:11:06.546076	2026-04-29 15:11:11.635785	5	::1	\N
28	2026-04-29 15:11:11.689927	2026-04-29 15:11:17.467878	6	::1	\N
29	2026-04-29 15:11:17.503198	2026-04-29 15:11:20.577013	3	::1	\N
30	2026-04-29 15:11:20.596901	2026-04-29 15:11:24.234321	4	::1	\N
31	2026-04-29 15:11:24.268903	2026-04-29 15:11:25.690669	1	::1	\N
32	2026-04-29 15:11:25.708726	2026-04-29 15:11:28.530301	3	::1	\N
33	2026-04-29 15:11:28.565742	2026-04-29 15:11:31.16909	3	::1	\N
34	2026-04-29 15:11:31.203141	2026-04-29 15:11:36.059973	5	::1	\N
50	2026-05-04 18:36:55.539705	2026-05-04 18:37:21.299808	26	::1	\N
51	2026-05-04 18:37:21.330862	2026-05-04 18:37:35.245098	14	::1	\N
76	2026-05-04 18:50:32.548634	2026-05-04 18:50:42.646551	10	::1	\N
77	2026-05-04 18:50:42.716481	2026-05-04 18:50:59.921818	17	::1	\N
52	2026-05-04 18:37:35.275638	2026-05-04 18:38:14.963715	40	::1	\N
78	2026-05-04 18:50:59.979498	2026-05-04 18:51:06.639565	7	::1	\N
53	2026-05-04 18:38:14.992063	2026-05-04 18:39:04.725831	50	::1	\N
54	2026-05-04 18:39:04.754037	2026-05-04 18:40:33.377358	89	::1	\N
79	2026-05-04 18:51:06.693936	2026-05-04 18:51:14.967195	8	::1	\N
55	2026-05-04 18:40:33.404865	2026-05-04 18:41:14.264142	41	::1	\N
56	2026-05-04 18:41:14.338474	2026-05-04 18:41:25.871445	12	::1	\N
80	2026-05-04 18:51:15.013878	2026-05-04 18:51:37.053447	22	::1	\N
57	2026-05-04 18:41:25.928869	2026-05-04 18:43:39.888107	134	::1	\N
58	2026-05-04 18:43:39.932802	2026-05-04 18:44:58.119635	78	::1	\N
59	2026-05-04 18:44:58.157034	2026-05-04 18:45:04.547827	6	::1	\N
60	2026-05-04 18:45:04.587134	2026-05-04 18:45:09.323258	5	::1	\N
61	2026-05-04 18:45:09.352048	2026-05-04 18:45:14.15649	5	::1	\N
62	2026-05-04 18:45:14.181498	2026-05-04 18:45:20.546443	6	::1	\N
63	2026-05-04 18:45:20.58017	2026-05-04 18:45:27.110229	7	::1	\N
64	2026-05-04 18:45:27.140001	2026-05-04 18:45:33.348826	6	::1	\N
65	2026-05-04 18:45:33.378909	2026-05-04 18:45:41.398709	8	::1	\N
81	2026-05-04 18:51:37.120311	2026-05-04 18:52:10.462328	33	::1	\N
82	2026-05-04 18:52:10.521094	2026-05-04 18:52:26.890158	16	::1	\N
99	2026-05-04 19:21:06.059094	2026-05-04 19:23:46.650955	161	::1	\N
83	2026-05-04 18:52:26.959654	2026-05-04 18:53:20.831419	54	::1	\N
101	2026-05-04 19:23:18.38546	2026-05-04 19:51:03.882629	1665	::ffff:192.168.76.103	\N
84	2026-05-04 18:53:20.888726	2026-05-04 18:55:07.071827	106	::1	\N
102	2026-05-04 19:23:46.717224	2026-05-04 19:24:19.482583	33	::1	\N
85	2026-05-04 18:55:07.152454	2026-05-04 18:57:22.162105	135	::1	\N
86	2026-05-04 18:57:22.228018	2026-05-04 18:57:47.072777	25	::1	\N
103	2026-05-04 19:24:19.54354	2026-05-04 19:25:34.06563	75	::1	\N
104	2026-05-04 19:25:34.164295	2026-05-04 19:25:41.834167	8	::1	\N
87	2026-05-04 18:57:47.147611	2026-05-04 19:09:54.476544	727	::1	\N
88	2026-05-04 19:09:54.533634	2026-05-04 19:10:17.81887	23	::1	\N
105	2026-05-04 19:25:41.910522	2026-05-04 19:25:56.519044	15	::1	\N
89	2026-05-04 19:10:17.865204	2026-05-04 19:11:13.296067	55	::1	\N
106	2026-05-04 19:25:56.575982	2026-05-04 19:26:07.184783	11	::1	\N
126	2026-05-04 19:39:25.380508	2026-05-04 19:39:29.429699	4	::1	\N
90	2026-05-04 19:11:13.35011	2026-05-04 19:13:47.574038	154	::1	\N
107	2026-05-04 19:26:07.238953	2026-05-04 19:27:25.027896	78	::1	\N
127	2026-05-04 19:39:29.486649	2026-05-04 19:39:35.457136	6	::1	\N
92	2026-05-04 19:13:47.619465	2026-05-04 19:17:51.653225	244	::1	\N
93	2026-05-04 19:17:51.722609	2026-05-04 19:18:09.130284	17	::1	\N
94	2026-05-04 19:18:09.220795	2026-05-04 19:18:48.148957	39	::1	\N
95	2026-05-04 19:18:48.212814	2026-05-04 19:18:55.989097	8	::1	\N
96	2026-05-04 19:18:56.060019	2026-05-04 19:19:15.450138	19	::1	\N
97	2026-05-04 19:19:15.505524	2026-05-04 19:19:30.311361	15	::1	\N
98	2026-05-04 19:19:30.365037	2026-05-04 19:21:05.975934	96	::1	\N
100	2026-05-04 19:23:13.176698	2026-05-04 19:51:10.051411	1677	::ffff:192.168.76.103	\N
108	2026-05-04 19:27:25.116184	2026-05-04 19:27:52.113519	27	::1	\N
131	2026-05-04 19:42:14.487807	2026-05-04 19:42:22.086251	8	::1	\N
91	2026-05-04 19:12:21.423839	2026-05-04 19:39:55.929762	1655	::1	\N
109	2026-05-04 19:27:52.171907	2026-05-04 19:28:53.659565	61	::1	\N
110	2026-05-04 19:28:53.742831	2026-05-04 19:29:13.734482	20	::1	\N
111	2026-05-04 19:29:13.785076	2026-05-04 19:31:21.477067	128	::1	\N
112	2026-05-04 19:31:21.540042	2026-05-04 19:31:33.667727	12	::1	\N
113	2026-05-04 19:31:33.720215	2026-05-04 19:31:40.591451	7	::1	\N
114	2026-05-04 19:31:40.654388	2026-05-04 19:32:06.006458	25	::1	\N
115	2026-05-04 19:32:06.089094	2026-05-04 19:32:09.525067	3	::1	\N
116	2026-05-04 19:32:09.578002	2026-05-04 19:32:15.838767	6	::1	\N
117	2026-05-04 19:32:15.896584	2026-05-04 19:32:19.520512	4	::1	\N
118	2026-05-04 19:32:19.576098	2026-05-04 19:32:27.137556	8	::1	\N
119	2026-05-04 19:32:27.192195	2026-05-04 19:32:29.79379	3	::1	\N
120	2026-05-04 19:32:29.853803	2026-05-04 19:33:28.728679	59	::1	\N
121	2026-05-04 19:33:28.793817	2026-05-04 19:33:36.652216	8	::1	\N
122	2026-05-04 19:33:36.725034	2026-05-04 19:33:40.694048	4	::1	\N
123	2026-05-04 19:33:40.751127	2026-05-04 19:33:47.052499	6	::1	\N
132	2026-05-04 19:42:22.166745	2026-05-04 19:42:42.510681	20	::1	\N
128	2026-05-04 19:39:35.515745	2026-05-04 19:41:17.622492	102	::1	\N
138	2026-05-04 19:48:35.963962	2026-05-04 19:48:46.474093	11	::1	\N
124	2026-05-04 19:33:47.106564	2026-05-04 19:39:22.042292	335	::1	\N
125	2026-05-04 19:39:22.146165	2026-05-04 19:39:25.322583	3	::1	\N
133	2026-05-04 19:42:42.568157	2026-05-04 19:43:14.197656	32	::1	\N
129	2026-05-04 19:41:17.669318	2026-05-04 19:42:02.943733	45	::1	\N
130	2026-05-04 19:42:03.024497	2026-05-04 19:42:14.407344	11	::1	\N
136	2026-05-04 19:46:09.941026	2026-05-04 19:48:26.060734	136	::1	\N
135	2026-05-04 19:45:11.757267	2026-05-04 19:46:09.894441	58	::1	\N
134	2026-05-04 19:43:14.253538	2026-05-04 19:45:11.698443	117	::1	\N
137	2026-05-04 19:48:33.044801	2026-05-04 19:48:35.906855	3	::1	\N
139	2026-05-04 19:48:46.538167	2026-05-04 19:48:53.348946	7	::1	\N
140	2026-05-04 19:48:53.405234	2026-05-04 19:48:58.944847	6	::1	\N
141	2026-05-04 19:48:59.016204	2026-05-04 19:49:03.035807	4	::1	\N
142	2026-05-04 19:49:03.097257	2026-05-04 19:49:05.944416	3	::1	\N
143	2026-05-04 19:49:05.996086	2026-05-04 19:49:10.758552	5	::1	\N
144	2026-05-04 19:49:10.821592	2026-05-04 19:49:15.128625	4	::1	\N
145	2026-05-04 19:49:15.198906	2026-05-04 19:50:50.152083	95	::1	\N
147	2026-05-04 19:51:09.989099	2026-05-04 19:51:13.168381	3	::ffff:192.168.76.103	\N
149	2026-05-04 19:51:35.46122	2026-05-04 19:51:38.470716	3	::ffff:192.168.76.103	\N
146	2026-05-04 19:50:50.234362	2026-05-04 19:58:46.267619	476	::1	\N
148	2026-05-04 19:51:13.219432	2026-05-04 19:51:35.397074	22	::ffff:192.168.76.103	\N
150	2026-05-04 19:51:38.529778	2026-05-04 20:06:20.298379	882	::ffff:192.168.76.103	\N
151	2026-05-04 19:58:46.398103	2026-05-04 19:58:47.879287	1	::1	\N
196	2026-05-04 21:25:29.117733	2026-05-04 21:39:52.765365	864	::1	\N
152	2026-05-04 19:58:47.953165	2026-05-04 20:02:31.745532	224	::1	\N
153	2026-05-04 20:02:31.824741	2026-05-04 20:02:33.349586	2	::1	\N
154	2026-05-04 20:02:33.398255	2026-05-04 20:02:46.685249	13	::1	\N
155	2026-05-04 20:02:46.754324	2026-05-04 20:02:51.548106	5	::1	\N
156	2026-05-04 20:02:51.607844	2026-05-04 20:02:59.387114	8	::1	\N
157	2026-05-04 20:02:59.448149	2026-05-04 20:03:01.072671	2	::1	\N
158	2026-05-04 20:03:01.133605	2026-05-04 20:03:06.220042	5	::1	\N
159	2026-05-04 20:03:06.284196	2026-05-04 20:03:08.065599	2	::1	\N
160	2026-05-04 20:03:08.130453	2026-05-04 20:03:10.758273	3	::1	\N
161	2026-05-04 20:03:10.823811	2026-05-04 20:03:12.664391	2	::1	\N
162	2026-05-04 20:03:12.727948	2026-05-04 20:03:15.197429	2	::1	\N
163	2026-05-04 20:03:15.280456	2026-05-04 20:03:17.80889	3	::1	\N
164	2026-05-04 20:03:17.866673	2026-05-04 20:03:19.667959	2	::1	\N
165	2026-05-04 20:03:19.725932	2026-05-04 20:03:20.708086	1	::1	\N
202	2026-05-04 21:39:52.824735	2026-05-04 21:39:55.444307	3	::1	\N
203	2026-05-04 21:39:55.494468	2026-05-04 21:40:13.851289	18	::1	\N
254	2026-05-04 23:15:47.198802	2026-05-04 23:15:48.339161	1	::1	\N
167	2026-05-04 20:06:20.350738	2026-05-04 20:08:03.243013	103	::ffff:192.168.76.103	\N
204	2026-05-04 21:40:13.894275	2026-05-04 21:43:20.453004	187	::1	\N
166	2026-05-04 20:03:20.793206	2026-05-04 20:09:24.866405	364	::1	\N
168	2026-05-04 20:09:24.917781	2026-05-04 20:09:27.249147	2	::1	\N
245	2026-05-04 23:11:34.571078	2026-05-04 23:13:12.768019	98	::1	\N
214	2026-05-04 21:53:21.01236	2026-05-04 22:10:05.587816	1005	::1	\N
205	2026-05-04 21:43:20.487842	2026-05-04 21:47:00.009626	220	::1	\N
170	2026-05-04 20:24:17.728501	2026-05-04 20:25:12.93054	55	::ffff:192.168.76.103	\N
171	2026-05-04 20:25:12.971379	2026-05-04 20:25:54.446015	41	::ffff:192.168.76.103	\N
228	2026-05-04 22:10:05.624299	2026-05-04 22:10:07.458071	2	::1	\N
169	2026-05-04 20:09:27.270339	2026-05-04 20:30:25.710457	1258	::1	\N
172	2026-05-04 20:30:25.800941	2026-05-04 20:33:00.071467	154	::1	\N
173	2026-05-04 20:33:00.119715	2026-05-04 20:33:12.831608	13	::1	\N
174	2026-05-04 20:33:12.874442	2026-05-04 20:33:40.100234	27	::1	\N
175	2026-05-04 20:33:40.13326	2026-05-04 20:33:50.606895	10	::1	\N
176	2026-05-04 20:33:50.629554	2026-05-04 20:34:26.116796	35	::1	\N
177	2026-05-04 20:34:26.141044	2026-05-04 20:35:24.221971	58	::1	\N
178	2026-05-04 20:35:24.250889	2026-05-04 20:36:33.711871	69	::1	\N
179	2026-05-04 20:36:33.737492	2026-05-04 20:36:34.965885	1	::1	\N
180	2026-05-04 20:36:34.989719	2026-05-04 20:37:57.988764	83	::1	\N
181	2026-05-04 20:37:58.010515	2026-05-04 20:40:09.304833	131	::1	\N
182	2026-05-04 20:40:09.337649	2026-05-04 20:40:10.378007	1	::1	\N
183	2026-05-04 20:40:10.426906	2026-05-04 20:40:11.147277	1	::1	\N
184	2026-05-04 20:40:11.205569	2026-05-04 20:40:12.202681	1	::1	\N
185	2026-05-04 20:40:12.230921	2026-05-04 20:42:24.967433	133	::1	\N
186	2026-05-04 20:42:24.99385	2026-05-04 20:42:53.546879	29	::1	\N
187	2026-05-04 20:42:53.573531	2026-05-04 20:43:08.383055	15	::1	\N
201	2026-05-04 21:39:26.200441	2026-05-04 21:50:10.410179	644	::1	\N
188	2026-05-04 20:43:08.410168	2026-05-04 20:44:06.304148	58	::1	\N
189	2026-05-04 20:44:06.330328	2026-05-04 20:45:47.58609	101	::1	\N
190	2026-05-04 21:16:20.111984	2026-05-04 21:16:23.873046	4	::1	\N
229	2026-05-04 22:10:07.51659	2026-05-04 22:10:15.897797	8	::1	\N
230	2026-05-04 22:10:15.953821	2026-05-04 22:11:05.874673	50	::1	\N
206	2026-05-04 21:47:00.060548	2026-05-04 21:50:30.19537	210	::1	\N
191	2026-05-04 21:16:23.917037	2026-05-04 21:25:23.944911	540	::1	\N
193	2026-05-04 21:25:23.979727	2026-05-04 21:25:26.324129	2	::1	\N
194	2026-05-04 21:25:26.353567	2026-05-04 21:25:28.072369	2	::1	\N
195	2026-05-04 21:25:28.110534	2026-05-04 21:25:29.092132	1	::1	\N
208	2026-05-04 21:50:30.254169	2026-05-04 21:50:45.391764	15	::1	\N
192	2026-05-04 21:19:00.122903	2026-05-04 21:36:24.126642	1044	::1	\N
197	2026-05-04 21:36:24.204303	2026-05-04 21:36:26.44681	2	::1	\N
198	2026-05-04 21:36:26.480889	2026-05-04 21:36:29.311851	3	::1	\N
199	2026-05-04 21:36:29.360552	2026-05-04 21:36:33.774405	4	::1	\N
209	2026-05-04 21:50:45.422232	2026-05-04 21:50:56.904173	11	::1	\N
200	2026-05-04 21:36:33.828106	2026-05-04 21:39:26.154642	172	::1	\N
231	2026-05-04 22:11:05.919288	2026-05-04 22:11:38.883396	33	::1	\N
210	2026-05-04 21:50:56.950705	2026-05-04 21:51:08.848145	12	::1	\N
232	2026-05-04 22:11:38.963621	2026-05-04 22:12:05.857258	27	::1	\N
212	2026-05-04 21:51:25.805446	\N	\N	::1	\N
211	2026-05-04 21:51:08.893842	2026-05-04 21:51:41.846114	33	::1	\N
213	2026-05-04 21:51:41.872661	2026-05-04 21:53:20.982113	99	::1	\N
233	2026-05-04 22:12:05.911059	2026-05-04 22:13:05.426353	60	::1	\N
207	2026-05-04 21:50:10.453492	2026-05-04 21:54:38.862478	268	::1	\N
234	2026-05-04 22:13:05.48429	2026-05-04 22:13:06.302324	1	::1	\N
215	2026-05-04 21:55:35.440148	2026-05-04 21:58:35.630274	180	::1	\N
216	2026-05-04 21:58:35.679962	2026-05-04 21:59:12.566492	37	::1	\N
217	2026-05-04 21:59:12.601659	2026-05-04 21:59:22.388693	10	::1	\N
218	2026-05-04 21:59:22.432367	2026-05-04 22:00:08.77015	46	::1	\N
219	2026-05-04 22:00:08.832443	2026-05-04 22:00:22.215816	13	::1	\N
220	2026-05-04 22:00:22.254579	2026-05-04 22:00:57.889533	36	::1	\N
221	2026-05-04 22:00:57.922598	2026-05-04 22:00:59.181589	1	::1	\N
222	2026-05-04 22:00:59.21747	2026-05-04 22:01:06.360214	7	::1	\N
223	2026-05-04 22:01:06.403394	2026-05-04 22:01:06.973974	1	::1	\N
235	2026-05-04 23:08:34.919182	2026-05-04 23:08:37.064407	2	::1	\N
224	2026-05-04 22:01:07.014497	2026-05-04 22:01:44.284916	37	::1	\N
225	2026-05-04 22:01:44.34817	2026-05-04 22:02:18.347986	34	::1	\N
226	2026-05-04 22:02:18.379309	2026-05-04 22:02:22.172492	4	::1	\N
227	2026-05-04 22:02:22.20936	2026-05-04 22:02:32.950591	11	::1	\N
236	2026-05-04 23:08:37.107081	2026-05-04 23:08:39.477236	2	::1	\N
237	2026-05-04 23:08:39.539427	2026-05-04 23:08:40.21013	1	::1	\N
246	2026-05-04 23:13:12.820509	2026-05-04 23:13:18.119735	5	::1	\N
239	2026-05-04 23:10:30.098991	2026-05-04 23:10:35.102312	5	::1	\N
240	2026-05-04 23:10:35.133214	2026-05-04 23:10:36.321091	1	::1	\N
247	2026-05-04 23:13:18.140304	2026-05-04 23:13:19.389043	1	::1	\N
248	2026-05-04 23:13:19.408473	2026-05-04 23:13:27.620512	8	::1	\N
238	2026-05-04 23:08:40.261003	2026-05-04 23:10:53.028021	133	::1	\N
241	2026-05-04 23:10:36.350825	2026-05-04 23:11:21.048736	45	::1	\N
242	2026-05-04 23:11:21.083788	2026-05-04 23:11:27.342854	6	::1	\N
243	2026-05-04 23:11:27.390651	2026-05-04 23:11:33.464629	6	::1	\N
244	2026-05-04 23:11:33.497728	2026-05-04 23:11:34.533516	1	::1	\N
249	2026-05-04 23:13:27.654071	2026-05-04 23:14:19.455983	52	::1	\N
250	2026-05-04 23:14:19.519188	2026-05-04 23:14:24.225124	5	::1	\N
251	2026-05-04 23:14:24.280361	2026-05-04 23:14:24.920041	1	::1	\N
252	2026-05-04 23:14:24.970469	2026-05-04 23:14:29.117034	4	::1	\N
255	2026-05-04 23:15:48.38737	2026-05-04 23:15:49.238619	1	::1	\N
253	2026-05-04 23:14:29.147719	2026-05-04 23:15:47.128739	78	::1	\N
256	2026-05-04 23:15:49.274434	2026-05-04 23:15:50.371036	1	::1	\N
257	2026-05-04 23:15:50.412295	2026-05-04 23:15:50.97643	1	::1	\N
258	2026-05-04 23:15:51.023257	2026-05-04 23:15:52.764257	2	::1	\N
259	2026-05-04 23:15:52.799099	2026-05-04 23:15:53.545818	1	::1	\N
260	2026-05-04 23:15:53.595283	2026-05-04 23:15:56.323461	3	::1	\N
261	2026-05-04 23:15:56.363971	2026-05-04 23:15:59.238981	3	::1	\N
262	2026-05-04 23:15:59.28929	2026-05-04 23:16:00.953011	2	::1	\N
263	2026-05-04 23:16:01.0028	2026-05-04 23:16:03.308399	2	::1	\N
264	2026-05-04 23:16:03.339858	2026-05-04 23:16:04.929869	2	::1	\N
265	2026-05-04 23:16:04.977361	2026-05-04 23:16:07.01188	2	::1	\N
266	2026-05-04 23:16:07.061094	2026-05-04 23:16:08.731145	2	::1	\N
268	2026-05-04 23:16:57.503228	2026-05-04 23:16:58.50129	1	::1	\N
267	2026-05-04 23:16:08.778964	2026-05-04 23:16:57.427978	49	::1	\N
269	2026-05-04 23:16:58.534871	2026-05-04 23:17:00.044044	2	::1	\N
270	2026-05-04 23:17:00.080639	2026-05-04 23:17:01.098312	1	::1	\N
271	2026-05-04 23:17:01.130135	2026-05-04 23:17:04.687027	4	::1	\N
272	2026-05-04 23:17:04.721229	2026-05-04 23:17:06.137667	1	::1	\N
273	2026-05-04 23:17:06.190057	2026-05-04 23:17:07.721414	2	::1	\N
274	2026-05-04 23:17:07.765026	2026-05-04 23:17:11.077317	3	::1	\N
275	2026-05-04 23:17:11.110632	2026-05-04 23:17:13.51095	2	::1	\N
276	2026-05-04 23:17:13.539883	2026-05-04 23:17:27.911324	14	::1	\N
277	2026-05-04 23:17:27.943919	2026-05-04 23:17:29.812822	2	::1	\N
278	2026-05-04 23:17:29.840384	2026-05-04 23:17:31.029096	1	::1	\N
334	2026-05-04 23:33:34.746446	2026-05-04 23:33:40.958209	6	::1	\N
279	2026-05-04 23:17:31.052402	2026-05-04 23:19:19.738965	109	::1	\N
280	2026-05-04 23:19:19.783594	2026-05-04 23:19:20.901048	1	::1	\N
281	2026-05-04 23:19:20.95897	2026-05-04 23:19:32.075892	11	::1	\N
282	2026-05-04 23:19:32.126839	2026-05-04 23:19:34.482152	2	::1	\N
283	2026-05-04 23:19:34.53007	2026-05-04 23:19:38.410581	4	::1	\N
284	2026-05-04 23:19:38.443612	2026-05-04 23:19:39.163789	1	::1	\N
285	2026-05-04 23:19:39.203121	2026-05-04 23:19:49.976348	11	::1	\N
286	2026-05-04 23:19:50.005267	2026-05-04 23:19:50.6689	1	::1	\N
353	2026-05-05 12:33:43.06809	2026-05-05 12:38:03.744064	261	::1	\N
287	2026-05-04 23:19:50.695427	2026-05-04 23:20:10.13673	19	::1	\N
288	2026-05-04 23:20:10.16126	2026-05-04 23:20:11.886527	2	::1	\N
289	2026-05-04 23:20:11.919771	2026-05-04 23:20:13.433926	2	::1	\N
335	2026-05-04 23:33:40.980805	2026-05-04 23:33:55.876971	15	::1	\N
290	2026-05-04 23:20:13.453616	2026-05-04 23:21:02.163641	49	::1	\N
291	2026-05-04 23:21:02.212078	2026-05-04 23:21:03.161675	1	::1	\N
292	2026-05-04 23:21:03.208884	2026-05-04 23:21:15.943346	13	::1	\N
293	2026-05-04 23:21:15.992781	2026-05-04 23:21:18.188055	2	::1	\N
294	2026-05-04 23:21:18.232282	2026-05-04 23:21:18.799531	1	::1	\N
295	2026-05-04 23:21:18.84889	2026-05-04 23:21:20.160568	1	::1	\N
296	2026-05-04 23:21:20.190599	2026-05-04 23:21:21.242307	1	::1	\N
297	2026-05-04 23:21:21.298745	2026-05-04 23:21:31.169102	10	::1	\N
298	2026-05-04 23:21:31.223147	2026-05-04 23:21:32.611339	1	::1	\N
299	2026-05-04 23:21:32.657368	2026-05-04 23:22:18.362892	46	::1	\N
300	2026-05-04 23:22:18.428607	2026-05-04 23:22:20.236621	2	::1	\N
301	2026-05-04 23:22:20.25541	2026-05-04 23:22:21.012009	1	::1	\N
302	2026-05-04 23:22:21.040455	2026-05-04 23:22:37.508151	16	::1	\N
303	2026-05-04 23:22:37.561067	2026-05-04 23:22:39.528974	2	::1	\N
304	2026-05-04 23:22:39.573189	2026-05-04 23:22:43.97758	4	::1	\N
336	2026-05-04 23:33:55.936719	2026-05-04 23:34:28.306808	32	::1	\N
305	2026-05-04 23:22:44.032012	2026-05-04 23:24:18.966876	95	::1	\N
306	2026-05-04 23:24:19.02544	2026-05-04 23:24:20.786513	2	::1	\N
307	2026-05-04 23:24:20.823006	2026-05-04 23:24:22.921518	2	::1	\N
308	2026-05-04 23:24:22.971719	2026-05-04 23:24:57.678169	35	::1	\N
309	2026-05-04 23:24:57.736814	2026-05-04 23:24:59.223337	1	::1	\N
310	2026-05-04 23:24:59.256649	2026-05-04 23:25:02.190561	3	::1	\N
337	2026-05-04 23:34:28.346159	2026-05-04 23:34:30.321838	2	::1	\N
311	2026-05-04 23:25:02.23945	2026-05-04 23:26:54.651666	112	::1	\N
312	2026-05-04 23:26:54.683635	2026-05-04 23:27:03.064558	8	::1	\N
313	2026-05-04 23:27:03.095017	2026-05-04 23:27:03.832759	1	::1	\N
314	2026-05-04 23:27:03.849673	2026-05-04 23:27:25.528502	22	::1	\N
315	2026-05-04 23:27:25.56185	2026-05-04 23:27:26.3578	1	::1	\N
372	2026-05-05 18:40:48.354931	2026-05-05 18:40:56.813325	8	::1	\N
316	2026-05-04 23:27:26.396287	2026-05-04 23:27:55.256596	29	::1	\N
317	2026-05-04 23:27:55.308442	2026-05-04 23:27:56.6073	1	::1	\N
318	2026-05-04 23:27:56.648643	2026-05-04 23:27:57.615012	1	::1	\N
355	2026-05-05 12:38:03.795861	2026-05-05 12:40:29.005078	145	::1	\N
319	2026-05-04 23:27:57.638822	2026-05-04 23:29:10.598663	73	::1	\N
320	2026-05-04 23:29:10.681425	2026-05-04 23:29:12.159658	1	::1	\N
321	2026-05-04 23:29:12.185403	2026-05-04 23:29:13.18391	1	::1	\N
322	2026-05-04 23:29:13.245245	2026-05-04 23:29:19.690492	6	::1	\N
323	2026-05-04 23:29:19.728044	2026-05-04 23:29:21.040856	1	::1	\N
324	2026-05-04 23:29:21.077384	2026-05-04 23:29:22.580277	2	::1	\N
338	2026-05-04 23:34:30.368119	2026-05-04 23:38:06.288611	216	::1	\N
325	2026-05-04 23:29:22.645355	2026-05-04 23:31:08.84071	106	::1	\N
326	2026-05-04 23:31:08.937688	2026-05-04 23:31:10.094915	1	::1	\N
327	2026-05-04 23:31:10.137623	2026-05-04 23:31:10.812496	1	::1	\N
339	2026-05-04 23:38:06.341906	2026-05-04 23:38:07.307218	1	::1	\N
328	2026-05-04 23:31:10.867563	2026-05-04 23:33:15.299369	124	::1	\N
329	2026-05-04 23:33:15.362209	2026-05-04 23:33:16.597532	1	::1	\N
330	2026-05-04 23:33:16.624655	2026-05-04 23:33:17.820369	1	::1	\N
331	2026-05-04 23:33:17.867813	2026-05-04 23:33:28.7505	11	::1	\N
332	2026-05-04 23:33:28.796703	2026-05-04 23:33:33.307003	5	::1	\N
333	2026-05-04 23:33:33.350397	2026-05-04 23:33:34.698201	1	::1	\N
340	2026-05-04 23:38:07.364164	2026-05-04 23:38:19.018957	12	::1	\N
341	2026-05-04 23:38:19.08049	2026-05-04 23:38:19.762203	1	::1	\N
342	2026-05-04 23:38:19.829449	2026-05-04 23:38:57.547271	38	::1	\N
343	2026-05-04 23:38:57.651338	2026-05-04 23:38:59.232468	2	::1	\N
345	2026-05-04 23:39:46.672042	2026-05-04 23:39:49.344902	3	::1	\N
346	2026-05-04 23:39:49.362254	2026-05-04 23:39:50.743678	1	::1	\N
347	2026-05-04 23:39:50.758722	2026-05-04 23:40:09.906063	19	::1	\N
356	2026-05-05 12:43:48.418021	2026-05-05 12:43:50.462883	2	::1	\N
348	2026-05-04 23:41:55.204555	2026-05-04 23:42:04.260406	9	::1	\N
344	2026-05-04 23:38:59.320102	2026-05-04 23:42:29.735898	210	::1	\N
349	2026-05-04 23:42:29.852962	2026-05-04 23:42:35.247715	5	::1	\N
357	2026-05-05 12:51:53.438961	2026-05-05 12:52:01.95574	9	::1	\N
358	2026-05-05 12:52:01.992541	2026-05-05 12:52:19.570307	18	::1	\N
359	2026-05-05 13:07:19.710476	2026-05-05 13:07:22.980832	3	::1	\N
360	2026-05-05 13:26:51.330643	2026-05-05 13:26:54.220452	3	::1	\N
373	2026-05-05 18:40:56.862481	2026-05-05 18:40:58.577173	2	::1	\N
350	2026-05-04 23:42:35.321417	2026-05-04 23:59:12.07731	997	::1	\N
351	2026-05-04 23:59:12.165764	2026-05-04 23:59:15.004971	3	::1	\N
361	2026-05-05 13:26:54.278805	2026-05-05 13:31:22.223732	268	::1	\N
352	2026-05-04 23:59:15.088403	2026-05-05 00:01:24.883497	130	::1	\N
362	2026-05-05 13:31:25.527135	2026-05-05 13:31:30.104368	5	::1	\N
374	2026-05-05 18:40:58.606655	2026-05-05 18:41:00.004655	1	::1	\N
354	2026-05-05 12:37:31.980844	2026-05-05 12:37:43.518755	12	::1	\N
363	2026-05-05 13:33:26.823034	2026-05-05 13:33:30.045314	3	::1	\N
375	2026-05-05 18:41:00.051331	\N	\N	::1	\N
364	2026-05-05 13:33:30.095131	2026-05-05 13:37:48.492691	258	::1	\N
365	2026-05-05 13:37:48.566352	2026-05-05 13:37:54.22494	6	::1	\N
366	2026-05-05 18:40:07.720648	2026-05-05 18:40:23.755966	16	::1	\N
367	2026-05-05 18:40:23.806163	2026-05-05 18:40:27.372984	4	::1	\N
368	2026-05-05 18:40:27.400815	2026-05-05 18:40:28.197093	1	::1	\N
369	2026-05-05 18:40:28.232019	2026-05-05 18:40:44.18345	16	::1	\N
370	2026-05-05 18:40:44.244734	2026-05-05 18:40:47.603007	3	::1	\N
371	2026-05-05 18:40:47.622987	2026-05-05 18:40:48.325776	1	::1	\N
376	2026-05-05 18:41:12.136118	2026-05-05 18:41:18.503467	6	::ffff:192.168.76.103	\N
377	2026-05-05 18:41:18.561707	2026-05-05 18:41:20.372294	2	::ffff:192.168.76.103	\N
378	2026-05-05 18:41:20.422814	2026-05-05 18:41:29.001289	9	::ffff:192.168.76.103	\N
379	2026-05-05 18:41:29.04709	2026-05-05 18:41:32.283383	3	::ffff:192.168.76.103	\N
380	2026-05-05 18:41:32.352098	2026-05-05 18:41:44.430875	12	::ffff:192.168.76.103	\N
381	2026-05-05 18:41:44.491492	2026-05-05 18:41:45.466545	1	::ffff:192.168.76.103	\N
382	2026-05-05 18:41:45.524707	2026-05-05 18:41:50.539891	5	::ffff:192.168.76.103	\N
383	2026-05-05 18:41:50.607717	2026-05-05 18:41:54.559732	4	::ffff:192.168.76.103	\N
384	2026-05-05 18:41:54.597859	2026-05-05 18:41:59.369241	5	::ffff:192.168.76.103	\N
385	2026-05-05 18:44:15.257819	2026-05-05 18:45:24.969689	70	::1	\N
386	2026-05-05 18:45:25.064393	2026-05-05 18:45:48.109886	23	::1	\N
387	2026-05-05 18:45:48.170307	\N	\N	::1	\N
388	2026-05-06 09:29:14.938673	2026-05-06 09:29:18.467549	4	::ffff:127.0.0.1	\N
390	2026-05-06 09:34:42.931277	2026-05-06 09:34:45.544655	3	::1	\N
389	2026-05-06 09:34:14.749303	2026-05-06 09:34:42.88552	28	::1	\N
391	2026-05-06 12:38:29.514045	2026-05-06 12:42:59.352834	270	::1	\N
392	2026-05-06 12:38:32.817554	\N	\N	::1	\N
395	2026-05-06 12:52:22.770206	2026-05-06 12:59:02.672427	400	::1	\N
393	2026-05-06 12:42:59.440422	2026-05-06 12:51:44.083338	525	::1	\N
394	2026-05-06 12:51:44.142959	2026-05-06 12:52:22.709594	39	::1	\N
397	2026-05-06 12:59:21.479176	2026-05-06 13:11:17.885126	716	::1	\N
396	2026-05-06 12:59:02.711004	2026-05-06 12:59:21.427267	19	::1	\N
398	2026-05-06 13:11:17.94284	2026-05-06 13:12:53.146125	95	::1	\N
399	2026-05-06 13:12:53.203641	2026-05-06 13:13:06.715118	14	::1	\N
400	2026-05-06 13:13:06.761061	2026-05-06 13:13:07.904605	1	::1	\N
401	2026-05-06 13:16:19.321733	2026-05-06 13:16:22.282385	3	::1	\N
402	2026-05-06 16:11:26.04928	2026-05-06 16:11:28.979623	3	::1	\N
403	2026-05-06 16:11:29.018652	2026-05-06 16:15:15.06588	226	::1	\N
404	2026-05-06 16:15:15.105326	2026-05-06 16:15:43.813188	29	::1	\N
405	2026-05-06 16:15:43.862442	2026-05-06 16:16:02.064413	18	::1	\N
\.


--
-- Data for Name: project_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_items (id, project_id, "image-url", is_main, description, note_order, layout) FROM stdin;
25	1	\N	f		8	square-blank
3	3	/images/uploads/projects/blue-velvet/blue-velvet-5.png	f	\N	3	wide
4	3	/images/uploads/projects/blue-velvet/blue-velvet-2.png	f	\N	4	square
26	1	/images/uploads/projects/edible-landscape/edible-landscape-7.png	f		9	wide
27	1	/images/uploads/projects/edible-landscape/edible-landscape-6.png	f		10	wide
28	1	\N	f		11	square-blank
29	1	/images/uploads/projects/edible-landscape/edible-landscape-8.png	f		12	square
13	3	/images/uploads/projects/blue-velvet/blue-velvet-7.png	f	\N	10	wide
14	3	/images/uploads/projects/blue-velvet/blue-velvet-4.png	f	\N	11	square
15	3	/images/uploads/projects/blue-velvet/blue-velvet-8.png	t	\N	12	square
16	1	\N	\N	\N	1	wide-blank
167	30	/images/uploads/projects/teszt-project/img3864.jpg	f		2	square
2	3	.png	\N	\N	2	square-blank
6	3	.png	\N	\N	6	wide-blank
12	3	.png	\N	\N	9	wide-blank
17	1	.png	\N		2	square-blank
1	3	/images/uploads/projects/blue-velvet/blue-velvet-6.png	f	\N	1	wide
5	3	/images/uploads/projects/blue-velvet/blue-velvet-1.png	f	\N	5	square
31	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-3.png	f		1	wide
32	2	.png	f		2	square-blank
33	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-10.png	f		3	wide
34	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-6.png	f		4	square
30	1	/images/uploads/projects/edible-landscape/edible-landscape-9.png	t	\N	15	square
35	2	.png	f		5	wide-blank
36	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-8.png	f		6	square
37	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-1.png	f		7	square
38	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-9.png	f		8	square
164	30	/images/uploads/projects/teszt-project/example-8.jpg	t	\N	1	\N
18	1	/images/uploads/projects/edible-landscape/edible-landscape-5.png	f		1	wide
19	1	/images/uploads/projects/edible-landscape/edible-landscape-1.png	f		2	square
20	1	/images/uploads/projects/edible-landscape/edible-landscape-4.png	f		3	square
21	1	\N	f		4	square-blank
22	1	/images/uploads/projects/edible-landscape/edible-landscape-3.png	f		5	square
23	1	/images/uploads/projects/edible-landscape/edible-landscape-2.png	f		6	square
24	1	\N	f		7	wide-blank
39	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-7.png	f		9	square
40	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-5.png	f	Hard bolied Ricardo Bofil eggs. Illustration from Wild Raspberries. Andy Warhol, 1959	10	square
45	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-12.png	t		15	square
46	4	/images/uploads/projects/the-feast-x-underworld-abyss/the-feast-x-underworld-abyss-5.png	f		1	square
48	4	/images/uploads/projects/the-feast-x-underworld-abyss/the-feast-x-underworld-abyss-4.png	f		3	square
50	4	/images/uploads/projects/the-feast-x-underworld-abyss/the-feast-x-underworld-abyss-1.png	f		5	square
51	4	/images/uploads/projects/the-feast-x-underworld-abyss/the-feast-x-underworld-abyss-3.png	f		6	square
53	4	/images/uploads/projects/the-feast-x-underworld-abyss/the-feast-x-underworld-abyss-2.png	f		8	square
54	4	/images/uploads/projects/the-feast-x-underworld-abyss/the-feast-x-underworld-abyss-6.png	t		9	square
41	2	.png	f		11	square-blank
42	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-2.png	f		12	wide
43	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-11.png	f		13	square
44	2	/images/uploads/projects/egg-val-solari-lab/egg-val-solari-lab-4.png	f		14	square
57	5	.png	f		3	square-blank
60	5	.png	f		6	wide-blank
47	4	.png	f		2	wide-blank
49	4	.png	f		4	square-blank
52	4	.png	f		7	square-blank
68	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-13.png	f		1	square
69	6	/images/uploads/projects/pasta-and-pickles/felirat.png	f		2	square
63	5	.png	f		9	square-blank
65	5	.png	f		11	square-blank
70	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-6.png	f		3	square
71	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-4.png	f		4	square
72	6	.png	f		5	square-blank
91	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-16.png	t		24	square
55	5	/images/uploads/projects/natures-signatures/natures-signatures-8.png	f		1	square
56	5	/images/uploads/projects/natures-signatures/natures-signatures-7.png	f		2	square
58	5	/images/uploads/projects/natures-signatures/natures-signatures-2.png	f		4	wide
59	5	/images/uploads/projects/natures-signatures/natures-signatures-1.png	f		5	square
61	5	/images/uploads/projects/natures-signatures/natures-signatures-6.png	f		7	square
62	5	/images/uploads/projects/natures-signatures/natures-signatures-5.png	f		8	wide
64	5	/images/uploads/projects/natures-signatures/natures-signatures-3.png	f		10	wide
66	5	/images/uploads/projects/natures-signatures/natures-signatures-4.png	f		12	wide
67	5	/images/uploads/projects/natures-signatures/natures-signatures-9.png	t		13	square
73	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-12.png	f		6	square
74	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-9.png	f		7	square
75	6	.png	f		8	square-blank
76	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-5.png	f		9	square
77	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-14.png	f		10	square
78	6	.png	f		11	square-blank
79	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-2.png	f		12	square
80	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-8.png	f		13	square
81	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-3.png	f		14	square
82	6	.png	f		15	wide-blank
83	6	.png	f		16	square-blank
84	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-11.png	f		17	square
85	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-1.png	f		18	square
86	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-7.png	f		19	square
87	6	.png	f		20	square-blank
88	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-15.png	f		21	wide
89	6	.png	f		22	square-blank
90	6	/images/uploads/projects/pasta-and-pickles/pasta-and-pickles-10.png	f		23	square
162	30	/images/uploads/projects/teszt-project/sewing-threads.jpg	f	Example light bulb	1	wide
\.


--
-- Data for Name: project_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_tags (project_id, tag_id) FROM stdin;
6	16
6	1
6	15
5	1
5	5
5	17
30	9
30	16
30	3
30	14
30	6
30	33
4	12
4	1
4	14
4	10
4	13
4	11
3	9
3	8
3	1
2	7
2	5
2	1
2	6
1	1
1	3
1	2
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, slug, title, description, created_at, subtitle) FROM stdin;
5	natures-signatures	Nature's signatures	At Luisa Catucci Gallery in Berlin Mitte, we presented a food installation exploring a continuous chain of translation: just as nature informed the artists' vision, their work became the foundation for our culinary exploration. Responding to the NATURE’S SIGNATURES exhibition, we metabolized static artworks into a synesthetic, edible medium, focusing on color, texture, sound, and organic composition.\n\nZak van Biljon’s infrared landscapes — where the green of chlorophyll turns into striking crimson — were mirrored through the use of natural red pigments like beetroot, subverting visual expectations. Tom Kretschmer’s focus on rhythm was turned into an experience of sound and touch. The sharp crunch of fragile crackers against viscous, slow-moving sauces brought the wild rhythms of nature directly to the palate. Finally, Samanta Malavasi’s root patterns became our floor plan, letting organic growth dictate how the food inhabited the tablescape.\n\nIf art imitates life, and life imitates art, here food imitates both, turning the act of eating into a radical exploration of perception.	2026-03-30 00:50:52.59567	
4	the-feast	The Feast	‘The FEAST’ is a living diorama and immersive food installation, staged within the deep sea theatre performance and drag show Underworld Abyss at Mahalla, Berlin. Set inside the imagined carcass of a fallen whale, the tablescape becomes both ocean floor and body. An altar to the abyss where creatures gather to honor and consume. Entirely plant-based, the spread transforms food into metaphor: marinated watermelon (fake tuna vegan sushi) becomes the flesh of the whale, spirulina evokes the depths of blue water, and algae conjures the taste of the sea.\r\n\r\nThe creatures of the abyss mirror the queer community itself, gathering in darkness and splendor around the fallen whale, to feast, to honor, and to celebrate survival. Together, performers and audience join in a ritual banquet where nourishment, decay, and transformation collapse into one—an edible ecosystem of the underworld.	2026-03-30 00:48:16.639958	
3	blue-velvet-1	Blue velvet	An immersive multisensorial dining performance where food, live music, and cinema merged into a single, carefully staged experience. ‘Blue Velvet – A Synesthetic Supper’ drew its aesthetic directly from David Lynch’s visual language: red roses against a white picket fence, the electric glow of neon signs, and the deep, tactile allure of blue and crimson velvet. Hosted at Lab der Musik, a cozy music school in Neukölln, the evening unfolded following the structure of operatic acts, each separated by live performances from professional musicians.\r\n\r\nThe menu acted as a series of edible vignettes, each designed to echo the contrasts and textures of Lynch’s world. Tables dressed in midnight-blue cloths reflected the glow of candlelight and neon, while carefully composed plates blurred the boundary between visual set-piece and culinary delight. By the final act, the supper had become a living scene: a charged, dreamlike frame where taste, sound, and vision existed as one.	2026-03-30 00:47:19.462363	with LAB DER MUSIK
1	edible-landscape-1	Edible Landscape	Edible Landscape emerges from the encounter between landscape architecture and food, translating TOPOTEK 1’s design language into an edible terrain. Starting from the chromatic map of the Superkilen project—red, green, black and white—the installation unfolds as a sequence of “rooms” arranged on a black circular table, reflecting Topotek’s recurring use of spatial compartmentalization as a landscape strategy.\r\n\r\nEach room interprets a fragment of the landscape through edible forms, colors, and materials: A pink dome of beetroot–anchovy butter, accompanied by uniquely shaped bagels, recalls Topotek’s inflatable structures; stone, marble, brick, and cobblestone samples become surfaces for small bites; an intentionally artificial green takes shape in bright pea hummus and chimichurri.\r\n\r\nFood acts as ground, architecture, and color field, transforming the table into a sensory landscape to be navigated, tasted, and shared.	2026-03-29 01:20:35.660973	
2	egg	EGG	EGG unfolds as an edible installation and performative banquet where food becomes sculptural object, gesture, and narrative.\r\n\r\nThe project places the egg at the center of the experience, not only as an ingredient but as a recurring presence that guides the entire banquet. Through its transformations, the egg becomes a lens to explore sensuality, anticipation, and shared pleasure.\r\n\r\nAt its core, vessels and table elements are created by artist Valeria Solari using bioceramics made from powdered eggshells and carrageenan, transforming waste and food-grade materials into tablescape. Across this shared landscape, egg-based preparations appear in multiple states—runny, whipped, set, fried—inviting moments of suspense and pleasure: yolks that break, sauces that flow, textures that surprise. While grounded in material research, EGG focuses on the performative power of food: an ephemeral choreography of eating that turns the table into a living, temporary ecosystem to be tasted, explored, and shared.	2026-03-30 00:45:04.749505	
6	pasta-and-pickles-1	Pasta and pickles	"The City in the City – Berlin: A Green Archipelago" is an urban planning manifesto by Oswald Mathias Ungers. Developed in a period of socio-political uncertainty, the project responded to the condition of a divided Berlin, proposing a city composed of distinct urban "islands" surrounded by green spaces—a sustainable vision of the city, well before environmental issues became central in contemporary debate.\r\n\r\nInspired by this manifesto, the project transforms the table into a radical landscape where food acts as a tool for interdisciplinary action, redefining sustainability through a lens of urban resistance and design. We journeyed from the winter constraints of February in Berlin—crafting a 100% plant-based menu from just four seasonal vegetables—to the sun-drenched Sannmann Greenhouse in Hamburg. This summer edition brought the theory back to the soil through a farm-to-table journey of pasta and pickling workshops, culminating in an aperitivo in the fields.	2026-03-30 00:52:05.927016	
30	teszt-project	Teszt project	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non augue ut lacus placerat scelerisque. Aliquam molestie, urna nec suscipit efficitur, erat elit semper ante, quis commodo diam libero sit amet risus. In hac habitasse platea dictumst. Nunc convallis auctor nibh, et scelerisque nisi ornare vitae. Mauris tristique nunc vitae nisl rutrum, at faucibus nisl dignissim. Nullam porta ipsum eu diam vestibulum pulvinar. Morbi vehicula orci lectus, quis hendrerit eros convallis id. Ut iaculis consectetur bibendum. Mauris quis nisl nec diam sodales placerat. Sed arcu sem, ullamcorper at euismod at, dapibus eu leo. Aliquam dolor nisi, facilisis eget facilisis id, gravida et leo. In at neque non ipsum vulputate tempor sit amet sed ipsum.\r\n\r\nVestibulum eget justo nec arcu lobortis lobortis 	2026-04-29 13:56:15.198759	This is a test project
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, name) FROM stdin;
1	food
2	materiality
3	landscape
5	exhibition
6	research
7	bio materials
8	classical music
9	cinema
10	performance
11	theatre
12	drag
13	puppetry
14	music
15	urbanism
16	ecology
17	art
33	test tag
\.


--
-- Name: admin_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admin_users_id_seq', 1, true);


--
-- Name: landing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.landing_id_seq', 1, false);


--
-- Name: page_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.page_sessions_id_seq', 405, true);


--
-- Name: project_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_items_id_seq', 170, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 30, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 33, true);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_username_key UNIQUE (username);


--
-- Name: landing landing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.landing
    ADD CONSTRAINT landing_pkey PRIMARY KEY (id);


--
-- Name: page_sessions page_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_sessions
    ADD CONSTRAINT page_sessions_pkey PRIMARY KEY (id);


--
-- Name: project_items project_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_items
    ADD CONSTRAINT project_items_pkey PRIMARY KEY (id);


--
-- Name: project_tags project_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_tags
    ADD CONSTRAINT project_tags_pkey PRIMARY KEY (project_id, tag_id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_key UNIQUE (slug);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: project_items project_items_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_items
    ADD CONSTRAINT project_items_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_tags project_tags_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_tags
    ADD CONSTRAINT project_tags_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- Name: project_tags project_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_tags
    ADD CONSTRAINT project_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

