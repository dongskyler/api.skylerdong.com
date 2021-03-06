# Working Repository for api.skylerdong.com

Repository: [https://github.com/dongskyler/api.skylerdong.com](https://github.com/dongskyler/api.skylerdong.com)

---

## Table of contents

- [Description](#Description)
- [Badges](#Badges)
- [Architecture](#Architecture)
- [Copyright notice](#Copyright-notice)
- [Styles](#Styles)
  - [Writing style](#Writing-style)
  - [Coding style](#Coding-style)
- [Server specs](#Server-specs)

---

## Description

This is the active working repository for the back-end of my websites at [api.skylerdong.com](api.skylerdong.com).

This API connects databases to my websites, including [skylerdong.com](skylerdong.com), [skylerdong.studio](skylerdong.studio) and their subdomains.

---

## Badges

![Node.js CI](https://github.com/dongskyler/api.skylerdong.com/workflows/Node.js%20CI/badge.svg)
[![Build Status](https://travis-ci.org/dongskyler/api.skylerdong.com.svg?branch=master)](https://travis-ci.org/dongskyler/api.skylerdong.com)
[![CodeFactor](https://www.codefactor.io/repository/github/dongskyler/api.skylerdong.com/badge)](https://www.codefactor.io/repository/github/dongskyler/api.skylerdong.com)
[![DeepScan grade](https://deepscan.io/api/teams/9441/projects/12040/branches/181474/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9441&pid=12040&bid=181474)

[![GitHub issues](https://img.shields.io/github/issues/dongskyler/api.skylerdong.com.svg)](https://GitHub.com/dongskyler/api.skylerdong.com/issues/)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/dongskyler/api.skylerdong.com.svg)](https://GitHub.com/dongskyler/api.skylerdong.com/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/dongskyler/api.skylerdong.com.svg)](https://GitHub.com/dongskyler/api.skylerdong.com/pulls/)
[![GitHub pull-requests closed](https://img.shields.io/github/issues-pr-closed/dongskyler/api.skylerdong.com.svg)](https://GitHub.com/dongskyler/api.skylerdong.com/pulls/)

---

## Architecture

![Architecture](./doc/architecture_gen3.svg)

I built this API with [Node](https://nodejs.org/en/) and [Express](https://expressjs.com).

API queries are handled by [Apollo server](https://www.apollographql.com/docs/) and [GraphQL](https://graphql.org/) that communicate with cloud noSQL database [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hosted by [Amazon Web Services](https://www.mongodb.com/cloud/atlas/aws-mongodb).

Full-text search is powered by [ElasticSearch](https://www.elastic.co/), primarily for my blogs.

---

## Copyright notice

The code is under MIT license.

However, my images, blogs and databases are not. It is always appreciated when you refer back to my website. However, all images, blogs and databases appearing on my root domains and all subdomains are not to be downloaded or reproduced in any way without permission. If you intend to use my images or blogs by any means or purchase prints, you are welcome to contact me at [dongskyler@gmail.com](mailto:dongskyler@gmail.com). Thank you.

---

## Styles

### Writing style

All writings on my website follow [AP Style](https://owl.purdue.edu/owl/subject_specific_writing/journalism_and_journalistic_writing/ap_style.html). :sunglasses:

### Coding style

Airbnb JavaScript style.

---

## Server specs

- Server provider: Google Cloud virtual machine
- Static IP: 35.223.28.142
- CPU: 1 core
- RAM: 2 GB
- Operating system: CentOS 8
- Web server: Nginx
