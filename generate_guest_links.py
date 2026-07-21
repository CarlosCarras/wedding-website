import os
import csv
import sys
import base64

# Secret key used for XOR encoding. Must match the key in Home.js!
XOR_KEY = "carlosandmari2026"

def encode_guest_name(name, key=XOR_KEY):
    """Encodes a name or list of names using a simple URL-safe XOR Base64 cipher."""
    name_bytes = name.encode('utf-8')
    xor_bytes = bytearray()
    for i, byte in enumerate(name_bytes):
        key_char = ord(key[i % len(key)])
        xor_bytes.append(byte ^ key_char)
    # Encode to URL-safe Base64 and strip padding "="
    encoded = base64.urlsafe_b64encode(xor_bytes).decode('utf-8')
    return encoded.rstrip('=')

def main():
    print("=" * 60)
    print("         Wedding Guest RSVP Link Generator")
    print("=" * 60)
    
    # Get base wedding URL from command argument or prompt
    base_url = "http://localhost:3000"
    # base_url = "http://marilynandcarlos.com"
    if len(sys.argv) > 1:
        base_url = sys.argv[1].rstrip('/')
    else:
        user_url = input(f"Enter your wedding website URL (default: {base_url}): ").strip()
        if user_url:
            base_url = user_url.rstrip('/')
            
    # Check for guests.txt input
    guest_file = "guests.txt"
    guests = []
    
    if os.path.exists(guest_file):
        print(f"Found '{guest_file}'. Reading guest names...")
        with open(guest_file, 'r', encoding='utf-8') as f:
            for line in f:
                name = line.strip()
                if name and not name.startswith('#'):
                    guests.append(name)
    else:
        # Create a sample template file with single and multi-guest entries
        print(f"'{guest_file}' not found. Creating a template file with sample names...")
        sample_names = [
            "John Doe, Jane Doe",
            "Marilyn Braojos, Carlos Carrasquillo, Teresa Chavez",
            "Single Guest Name"
        ]
        with open(guest_file, 'w', encoding='utf-8') as f:
            f.write("# Enter guest names one per line.\n")
            f.write("# To group multiple guests under a single link, separate names with commas.\n")
            f.write("# Example: John Doe, Jane Doe\n")
            f.write("# Lines starting with # are ignored.\n")
            for name in sample_names:
                f.write(f"{name}\n")
        guests = sample_names
        
    if not guests:
        print("Error: No guest names found in guests.txt.")
        return

    output_csv = "guest_rsvp_links.csv"
    print(f"Generating secure links for {len(guests)} parties...")
    
    try:
        with open(output_csv, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(["Guest Names", "Encoded Hash", "Personalized URL"])
            
            for guest in guests:
                encoded_hash = encode_guest_name(guest)
                personalized_url = f"{base_url}/?guest={encoded_hash}"
                writer.writerow([guest, encoded_hash, personalized_url])
                
        print("\nSuccess!")
        print(f"1. Personalized guest links written to: {os.path.abspath(output_csv)}")
        print(f"2. You can edit '{guest_file}' to add your actual guest list and re-run this script.")
        print("=" * 60)
        
    except Exception as e:
        print(f"Error writing CSV file: {e}")

if __name__ == "__main__":
    main()
