# Usability Improvements (Week 9)

Based on feedback and a heuristic evaluation of our Week 5 wireframes, the following 3 UI improvements have been implemented.

### Improvement 1: Table Status Color Legend
* **Problem Identified:** Users looking at the main floor plan wireframe were unsure what the gray vs. green table icons meant without clicking on them. This violated Nielsen's **Visibility of System Status** heuristic.
* **What Changed:** Added a persistent "Map Legend" component to the bottom left of the floor plan screen explicitly defining Green = "Available" and Red = "Occupied".
* **Why it Improves the Experience:** It removes the need for users to guess or remember system states, significantly speeding up the floor manager's ability to scan the room for open tables.

### Improvement 2: Confirmation on "Clear Table"
* **Problem Identified:** In the original wireframe, tapping "Clear Table" immediately reset the table to empty. A reviewer noted it was too easy to accidentally hit this button during a busy shift. This violated Nielsen's **Error Prevention** heuristic.
* **What Changed:** Tapping "Clear Table" now triggers a modal dialog that asks: *"Are you sure you want to clear Table 12?"* with primary "Confirm" and secondary "Cancel" buttons.
* **Why it Improves the Experience:** Destructive actions now have a safety net, preventing staff from accidentally wiping out a live table assignment during peak dinner rushes.

### Improvement 3: Empty State for "My Tables"
* **Problem Identified:** When a server logged in but hadn't been assigned any tables yet, the "My Tables" screen was completely blank. This violated Nielsen's **Help and Documentation / Visibility of System Status** heuristic.
* **What Changed:** The blank screen was replaced with an empty state illustration (a greyed-out table) and text reading: *"You have no assigned tables right now. See the Host to get your section."*
* **Why it Improves the Experience:** Users are no longer left wondering if the app is broken or still loading. The clear call-to-action tells them exactly how to resolve the empty state.