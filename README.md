# Workout Planner

A focused, mobile-first workout companion designed for simplicity and efficiency.

## The Story
I built this app because I needed a simple way to track my specific workout routine without the bloat of complex fitness apps. I didn't want to deal with user profiles, logins, or ads—just a tool that helps me focus on my workout.

This app is designed to be used in the gym, on your phone. It features a swipe-based interface that lets you move through your exercises seamlessly, just like flipping through cards.

## Features
- **Clean, Minimal Design**: Light theme with modern Inter typography for a premium, distraction-free experience.
- **Exercise Categories**: Organized workouts by category (Warm-Up, Lower Body, Upper Body, Core, Cool Down).
- **Swipe Navigation**: Move between exercises with a simple swipe left or right.
- **Progress Tracking**: Visual progress dots show where you are in your workout.
- **Smart Weight Tracking**: Automatically remembers the weight you used for each exercise (saved to your device).
- **No Login Required**: Your data lives on your phone. No accounts, no cloud sync issues.
- **Visual Cues**: Exercise images to keep you on track.

## How to Use
1.  **Open the App**: Load the URL on your mobile browser.
2.  **Start Workout**: Tap the start button to begin.
3.  **Track & Swipe**: 
    -   View the exercise category, name, and details (Sets, Reps, Duration).
    -   Enter your weight (it will be saved for next time).
    -   Swipe **Left** to go to the next exercise.
    -   Swipe **Right** to go back.
    -   Track your progress with the dots at the bottom.
4.  **Finish**: Reach the celebration screen and tap Finish to reset.

## Design Philosophy
- **Minimalism**: Clean, light interface with generous white space
- **Typography**: Modern Inter font with proper weight hierarchy
- **Mobile-First**: Optimized for use in the gym on your phone
- **Performance**: Fast load times with vanilla JavaScript

## Technical Details
Built with simplicity and performance in mind:
-   **Vanilla JavaScript**: No heavy frameworks, ensuring instant load times.
-   **Vite**: For a modern, fast development experience.
-   **CSS Variables**: For consistent theming and easy adjustments.
-   **Local Storage**: For persistent data without a backend.
-   **Google Fonts**: Inter font family for modern, elegant typography.

## Running Locally
1.  Clone the repo.
2.  Run `npm install`.
3.  Run `npm run dev`.
4.  Open `http://localhost:5173/` on your device.
