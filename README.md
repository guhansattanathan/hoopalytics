# 🏀 Hooplytics: Top Players Statistical Analysis

Hooplytics is a full-stack application designed to analyze and display top NBA player statistics. The backend, built with **Django and Pandas**, processes large player statistics data, sorts it using custom algorithms (Merge Sort and Heap Sort), and benchmarks the sorting efficiency. The frontend, built with **React and styled-components**, provides an interactive table for viewing the results.

---

## ✨ Features

* **Dynamic Data Fetching:** Data is fetched from a Django API endpoint (`/`) which processes player stats.
* **Interactive Sorting:** Users can select different statistical categories (**PPG, APG, RPG, STL, BLK, +/-**) via a dropdown to dynamically re-sort and display the top 10 players.
* **Sorting Algorithm Benchmarking:** The backend utilizes and compares the execution time of **Merge Sort** and **Heap Sort** to demonstrate algorithmic efficiency.
* **Custom Loading Indicator:** Features a custom, engaging, animated basketball loader built with `styled-components`.
* **Responsive Display:** Presents key player statistics in a clean, comprehensive table.

---

## 💻 Tech Stack

**Frontend:**
* **React** (for component structure)
* **Tailwind CSS** (for utility-first styling)
* **styled-components** (for the custom loader animation)
* **Vite/Next.js** (based on your project setup)

**Backend:**
* **Django** (for the server, routing, and JSON response)
* **Pandas** (for efficient data loading, filtering, and aggregation of player statistics from `PlayerStatistics.csv`)
* **Python** (Custom implementations of Merge Sort and Heap Sort)

---

## 🚀 Getting Started

### Prerequisites

* Python (3.8+) and pip
* Node.js (18+) and npm/yarn

### 1. Backend Setup (Django)

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd hoopalytics
    ```
2.  **Set up the Python environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt # Assuming dependencies like Django, pandas are listed
    ```
3.  **Ensure Data File is Present:** Verify the statistics file is located at the path specified in your Django view:
    ```
    data/archive/PlayerStatistics.csv
    ```
4.  **Run the Django Server:**
    ```bash
    python manage.py runserver
    # The API will be available at [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
    ```

### 2. Frontend Setup (React/Vite)

1.  **Navigate to the frontend directory:**
    ```bash
    cd [frontend-directory-name] # e.g., cd hoopalytics/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Run the Frontend Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application should now be accessible in your browser (usually at `http://localhost:5173/` or similar, depending on your Vite/Next.js config).

---

## 📂 Project Structure (Relevant Files)

| File | Description |
| :--- | :--- |
| `[app]/views.py` | **Backend Logic:** Contains `get_averages` (data processing with Pandas) and `top_players_view` (API route, sorting, and time benchmarking). |
| `[app]/heapsort.py` | Custom implementation of the **Heap Sort** algorithm. |
| `[app]/mergesort.py` | Custom implementation of the **Merge Sort** algorithm. |
| `src/components/TopPlayersTable.jsx` | **Frontend Main Component:** Fetches data, displays the table, and manages the `loading` and `selectedStat` states. |
| `src/components/StatSelector.jsx` | Dropdown component used to select the desired statistic for sorting. |

---

## 🛠️ Customization

### Changing the Season Start Date

The backend currently filters statistics starting from `2025-10-20`. To use a different time range (e.g., a past NBA season), modify the `season_start` variable in the `get_averages` function in `views.py`.

### Updating API Base URL

If your Django backend is running on a different port or domain, update the hardcoded URL in `src/components/TopPlayersTable.jsx`:

```javascript
// Before
const url = `http://127.0.0.1:8000/?stat=${selectedStat}`;
// After (Example)
// const url = `https://api.hoopalytics.com/data/?stat=${selectedStat}`;