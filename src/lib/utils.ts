import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TMDB_API_OPTIONS = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGEyNGE2MDM5OTA0ZTc1ODU4OGUwZTMzNTg5MWIzMSIsIm5iZiI6MTc3MTg2NDkzOS41MDQ5OTk5LCJzdWIiOiI2OTljODM2YjEwNzI5MTQ4YmJiMjkzYzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.meA9T5IyYS570DqyjieD_Y4SSY2dVzIDn0O6XcO5vQI",
  },
};
