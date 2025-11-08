#!/bin/bash
echo "Updating NBA dataset..."
kaggle datasets download -d eoinamoore/historical-nba-data-and-player-box-scores -p data/archive --unzip --force
echo "Dataset updated successfully at $(date)"
