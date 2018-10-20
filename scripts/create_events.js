load('scripts/events.js');

db = db.getSiblingDB('calendar');

db.calendar_cards.insert(events);