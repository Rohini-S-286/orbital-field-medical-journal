"""
Orbital Field Medical Journal — Local HTTP Server
Run this script to launch the offline-first Space Medical Journal PWA locally.
Usage:
    py serve.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable caching headers and service worker support
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()

def main():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 70)
        print(" ORBITAL FIELD MEDICAL JOURNAL — PWA SERVER")
        print(f" Serving at: {url}")
        print(" Theme: Warm Ivory (Day) / Night Cabin (Dark)")
        print(" Gloved Touch: 48px min targets | WCAG AA Contrast: Compliant")
        print(" Press Ctrl+C to stop the server.")
        print("=" * 70)
        
        # Try to open in default browser automatically
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Safe travels in orbit.")
            httpd.server_close()

if __name__ == "__main__":
    main()
