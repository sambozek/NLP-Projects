simpsons_page = 'http://simpsons-scripts.wikidot.com/simpsons-roasting-on-an-open-fire'

simpsons_text = "/html/body[@id='html-body']/div[@id='skrollr-body']/div[@id='container-wrap-wrap']/div[@id='container-wrap']/div[@id='container']/div[@id='content-wrap']/div[@id='main-content']/div//text()"

southpark_page = 'http://www.springfieldspringfield.co.uk/view_episode_scripts.php?tv-show=south-park&episode=s01e01'

southpark_text = '/html/body[@class=' hasGoogleVoiceExt']/div[@class='wrapper']/div[@id='content_container']/div[@class='main-content']/div[@class='main-content-left']/div[@class='episode_script']/div//text()'

import beautifulsoup
import requests


south_park = beautifulsoup.html(southpark_page)
simpsons = beautifulsoup.http(simpsons_page)


text_s = simpsons.text()