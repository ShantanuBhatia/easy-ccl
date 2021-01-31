import requests, sys, html5lib, lxml, argparse, re
from bs4 import BeautifulSoup

description = "Generates JSON of Kpop lyrics in Hangeul, Romanization and English by scraping colorcodedlyrics.com"

# parser = argparse.ArgumentParser(description=description)

TEST_URLS = ["https://colorcodedlyrics.com/2018/05/bts-bangtansonyeondan-fake-love",
             "https://colorcodedlyrics.com/2019/08/red-velvet-umpah-umpah-eumpaeumpa"]

def get_lyrics_page(lyrics_url):
    url = lyrics_url[1].strip()
    r = requests.get(url)
    soup = BeautifulSoup(r.content, "lxml")
    return soup

def extract_color(style_info):
    return re.search("\#\d+", style_info)


'''
Takes the beautifulsoup object representing the lyrics header, and returns a metadata dict
Input is the 2x2 table of the lyrics page
'''
def parse_metadata(md_table):
    meta_dict = {}
    song_data_html = md_table.find_all("tr")[0]

    song_data = {
        "title": song_data_html.h2.text,
        "group": "Red Velvet",
        "album": song_data_html.span.text
    }

    artist_data = md_table.find_all("tr")[1].find_all("td")[0].find_all("span")
    artist_dict = [ {"name": x.text, "color": re.search("\#[\d\w]+", x["style"]).group()} for x in artist_data]

    song_data["members"] = artist_dict

    for k in song_data.keys():
        if k == "members":
            print("members:")
            for member in song_data[k]:
                for k2 in member.keys():
                    print("\t{}: {}".format(k2, member[k2]))
                print()
        else:
            print("{}: {}".format(k, song_data[k]))
            print()

user_url = input("Annyeong! Plz give the URL of the song lyrics you want ccl-json of:\n")

print("Initializing...")
ccl_url = TEST_URLS
# ccl_url = [user_url]
lyricsoup = get_lyrics_page(ccl_url)
print("Parsing complete!")
metadata = lyricsoup.find_all("table")[0]
lyrics = lyricsoup.find_all("table")[1]
rom = lyrics.find_all("td")[0]
han = lyrics.find_all("td")[1]
eng = lyrics.find_all("td")[2]



while True:
    choice = input("Lyrics! You want han,rom,eng, or meta?. E to exit\n")
    if choice == "E":
        print("Annyeong!")
        break
    elif choice == "han":
        print(han)
    elif choice == "rom":
        print(rom)
    elif choice == "eng":
        print(eng)
    elif choice == "meta":
        parse_metadata(metadata)
    else:
        print("Invalid choice")