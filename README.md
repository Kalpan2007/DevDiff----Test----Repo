# DevDiff Test Project

Welcome to the DevDiff Test Project repository. This project is a dedicated playground designed to evaluate, validate, and verify security rule coverage for the DevDiff static analysis tool.

## Overview

The repository is structured to test different levels of risk across branches contributed by different roles:
- **Kalp ("The Villain"):** Covers critical and high-risk security rules with intentional vulnerabilities (under the `kalp/` directory).
- **Dax ("The Sneaky One"):** Covers a mix of medium and high-risk vulnerabilities.
- **Arya ("The Clean Coder"):** Covers clean, production-grade changes to evaluate false-positive rates and baseline scores (under the `arya/` directory), with one medium-risk dependency test.

## Usage Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- npm (Node Package Manager)

### Setup & Run
To run the setup for a specific contributor's directory:
1. Navigate to the desired folder (e.g., `arya/` or `kalp/`):
   ```bash
   cd arya
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm start
   ```

The application will start, by default, on port `3000` (or `PORT` defined in your environment).

## Testing Security Rules
Each contributor implements code focusing on specific rules. Analysis is run on each corresponding pull request to verify the scoring and detection:
- Critical score: 85 - 100
- High score: 60 - 84
- Medium score: 35 - 59
- Low/Clean score: 0 - 34
