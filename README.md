# TrackMerge

A courier tracking interface that detects the likely carrier based on tracking number format and displays mock delivery status updates.

## 🔍 Purpose

Courier APIs are often inconsistent, limited by rate caps, or return vague status messages. Many fail silently or go down without notice. TrackMerge simulates a realistic tracking experience while solving three common industry issues:

1. **Inconsistent tracking number formats across carriers**
2. **Unreliable or delayed API responses**
3. **Generic or unclear delivery progress messages**

This project uses mock logic to demonstrate a reliable, user-focused interface that could be expanded to include real API calls or fallback detection.

## 🧠 Features

- **Regex-based carrier detection**  
  Recognizes UPS, USPS, FedEx, DHL, Amazon Logistics, and Lasership based on input pattern.

- **Mock status generation**  
  Each carrier returns a delivery timeline of realistic, human-readable events.

- **Downtime simulation**  
  Mimics failed API responses (25% chance) to stress-test retry logic.

- **Retry button**  
  Injected dynamically only when a fetch fails, encouraging clean UX recovery.

- **Graceful failure handling**  
  No blank screens. Errors are communicated clearly with optional re-check.

## 📁 Project Structure
index.html → Main layout and input form
style.css → Clean, responsive UI using modern design principles
tracker.js → Carrier logic, status data, event handlers, timeline rendering


## 🛠 Sample Carriers Supported

- **UPS** — 1Z...
- **USPS** — 9XX...
- **FedEx** — 12 to 20 digits
- **DHL**
- **Amazon Logistics**
- **Lasership**

Each mock response is designed to mirror how real-world tracking systems behave, without requiring access to protected or rate-limited APIs.

## 🚧 Future Enhancements

- Add live courier API fallback with timeout caps
- Use localStorage to remember last-checked tracking number
- Style timeline with progress indicators or icons
- Expand international format detection

## 📎 Use Case

TrackMerge can be used as:
- A fallback UI when APIs are unreachable
- A sandbox for testing delivery UX
- A template for tracking UI integration

---

**Created with usability and logic-first principles.**
