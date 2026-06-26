DROP TABLE IF EXISTS hero_content;
CREATE TABLE hero_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL
);

INSERT INTO hero_content (title, subtitle) VALUES ('We Code<br />We Deliver', 'We are a digital agency specializing in web development, design, and digital marketing. We help businesses grow online.');

DROP TABLE IF EXISTS about_content;
CREATE TABLE about_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subtitle TEXT,
  title TEXT,
  description1 TEXT,
  description2 TEXT
);

INSERT INTO about_content (subtitle, title, description1, description2) VALUES ('ABOUT US', 'Grow Your Business With Our Creative Digital Ideas', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.');

DROP TABLE IF EXISTS stats_content;
CREATE TABLE stats_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customers TEXT,
  projects TEXT,
  workers TEXT,
  offices TEXT
);

INSERT INTO stats_content (id, customers, projects, workers, offices) VALUES (1, '190+', '250+', '50+', '10+');

DROP TABLE IF EXISTS services_content;
CREATE TABLE services_content (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT
);
INSERT INTO services_content (id, title, description) VALUES (1, 'Our Services', 'We offer a wide range of digital services to help your business grow and succeed in the modern world.');

DROP TABLE IF EXISTS gallery_content;
CREATE TABLE gallery_content (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT
);
INSERT INTO gallery_content (id, title, description) VALUES (1, 'Our Latest Work', 'Check out some of our recent projects that showcase our expertise and creativity.');

DROP TABLE IF EXISTS team_content;
CREATE TABLE team_content (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT
);
INSERT INTO team_content (id, title, description) VALUES (1, 'Meet Our Experts', 'Our team of professionals is dedicated to delivering the best results for your business.');

DROP TABLE IF EXISTS team_members;
CREATE TABLE team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  github_url TEXT
);
INSERT INTO team_members (name, role, image_url, twitter_url, linkedin_url, github_url) VALUES ('John Doe', 'CEO & Founder', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', '#', '#', '#');
INSERT INTO team_members (name, role, image_url, twitter_url, linkedin_url, github_url) VALUES ('Jane Smith', 'Lead Designer', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', '#', '#', '#');
INSERT INTO team_members (name, role, image_url, twitter_url, linkedin_url, github_url) VALUES ('Sarah Wilson', 'Project Manager', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', '#', '#', '#');
