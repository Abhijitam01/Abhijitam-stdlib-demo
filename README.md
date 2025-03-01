# Mini Build Status Dashboard

A Google Summer of Code (GSoC) 2025 showcase project demonstrating the use of the `stdlib` library within a TypeScript-based full-stack application. This mini dashboard fetches build logs from a Neon PostgreSQL database, calculates statistics using `@stdlib/stats`, and visualizes data with `@stdlib/plot`.

## Overview

This project is a lightweight dashboard designed to simulate monitoring build statuses for `stdlib` repositories. It aligns with my proposed GSoC project, _Build Status Dashboard_, by showcasing data retrieval, statistical computation, and visualization skills using `stdlib`.

### Features

- **Backend:** Node.js with Express, fetching build logs from Neon PostgreSQL.
- **Frontend:** React with TypeScript and Tailwind CSS, displaying logs in a filterable table.
- **Statistics:** Computes success rate and average build duration using `@stdlib/stats/base/mean`.
- **Visualization:** Generates an ASCII bar chart of build durations with `@stdlib/plot/ctor` (currently commented out for debugging).
- **Build Tool:** ESBuild for fast frontend bundling.

## Prerequisites

- **Node.js**: v20.11.0 or later (tested with v20.11.0).
- **npm**: v10.2.4 or later.
- **Neon PostgreSQL**: A free account at [neon.tech](https://neon.tech) for serverless PostgreSQL hosting.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Abhijitam/Abhijitam-stdlib-demo.git
   cd Abhijitam-stdlib-demo
   ```

## Running the code

1. **After cloniong the repository**
   ```bash
   npm install
   npm build
   npm start
   ```
