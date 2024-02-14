```
# React Project with Vite

This project is a simple React application bootstrapped with Vite. That allows to browser through public repositories and filters based on stars and search term.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

```bash
git clone <repository-url>
```

2. Navigate into the project directory:

```bash
cd <project-directory>
```

3. Install dependencies using npm:

```bash
npm install
```

### Running the Development Server

To run the development server and view the project in your browser, run the following command:

```bash
npm run dev
```

This command starts the development server and shows the URL to open. Any changes you make to the source files will be hot-reloaded, allowing for a smooth development experience.

### Building for Production

To build the project for production, run:

```bash
npm run build
```

This command generates an optimized build of your application in the `dist` directory.

## Project Structure

The project structure is as follows:

```
├── public/             # Public assets
├── src/                # Source code
│   ├── components/     # React components
│   ├── pages/     		# App Pages
│   ├── api/     		# API related hooks and utils
│   ├── utils/     		# Common utils
│   ├── App.js          # Main application component
│   └── index.js        # Entry point for the application
├── .gitignore          # Git ignore file
├── package.json        # NPM package configuration
└── README.md           # This README file
```
