import { useState, useCallback } from "react";

// ─── PLAYBOOK TEMPLATES ───────────────────────────────────────────────────────

const PLAYBOOK = {
  "Plumbing": {
    icon: "🔧", color: "#FFFFFF", bg: "#1A1A1A", border: "#333333",
    set1: [
      { day: 0, subject: "{city} plumbers", body: "Hey {first_name},\n\nYou guys still taking new service calls right now, or pretty booked?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} plumbers", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for plumbers around {city} that put them at the top of Google when someone searches \"plumber near me\" at 11pm with a burst pipe. The guys I work with are averaging 50–80 extra service calls a month from it.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nIf you want me to circle back in a few months, just reply \"later.\" If it's a no, reply \"no\" and I'll take you off the list.\n\nEither works — just don't want to keep bugging you.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at plumbers around {city}. Looks like you've been running a solid operation.\n\nQuick question — are you guys taking new service calls right now, or pretty booked up?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help plumbers in {city} bring in more service calls through Google ads — specifically Local Services Ads that show up before everything else when someone's water heater goes out. Most of the guys I work with start seeing calls within the first week.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox — totally get it, things get busy.\n\nIf there's any interest in getting more service calls through online ads, just reply \"yes\" or \"maybe\" and I'll take it from there.\n\nEither way, wishing you a strong rest of the year.\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} plumbers", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, which is better than most plumbers around {city}. But you're not showing up in Local Services Ads and your Facebook is dormant.\n\nThat's leaving money on the table every time someone has an emergency at 10pm. I help plumbers turn that into 50–80 extra service calls a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} plumbers", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a plumber in a similar-size market right now — we turned on Google Local Services Ads 6 weeks ago and they've booked 74 service calls off it. Spend is around $1,100/month, cost per lead around $22.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me — don't want to keep hitting your inbox.\n\nReality is plumbing is the highest-intent trade on Google. When someone types \"plumber near me\" they're calling someone in the next 5 minutes — and right now in {city}, that's not you.\n\nIf you want to see what that'd look like for {business_name}, reply \"send info\" and I'll put together a quick breakdown.\n\nOtherwise all good, won't bug you again.\n\n{sender_name}" },
    ],
  },
  "Roofing": {
    icon: "🏠", color: "#ED8936", bg: "#1A1200", border: "#5A3A00",
    set1: [
      { day: 0, subject: "{city} roofers", body: "Hey {first_name},\n\nYou guys still booking new roof jobs right now, or pretty slammed?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} roofers", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for roofers around {city} that put them at the top of Google when homeowners search for replacements, plus Facebook campaigns for full re-roofs. The roofers I work with right now are averaging 12–20 new installs a month from it.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nIf you want me to circle back before next storm season, just reply \"later.\" If it's a no, reply \"no\" and I'll take you off the list.\n\nEither works — just don't want to keep bugging you.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at roofers around {city}. Looks like you've been running a solid operation.\n\nQuick question — are you guys booking new roof jobs right now, or pretty full up heading into the season?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help roofers in {city} land more installs through Google and Facebook ads. Most of the guys I work with start getting replacement estimates booked within the first couple weeks.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox — totally get it, roofing season's brutal on your time.\n\nIf there's any interest in getting more roof jobs through online ads, just reply \"yes\" or \"maybe.\"\n\nEither way, wishing you a strong rest of the year.\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} roofers", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, which is better than most roofers around {city}. But your Facebook is barely active and you're not running any ads.\n\nThat's leaving money on the table when homeowners start looking for replacements. I help roofers turn that into 12–20 extra jobs a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} roofers", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a roofer in a similar-size market — we turned on Google Local Services Ads plus a Facebook retargeting campaign 6 weeks ago and they've booked 19 new installs. Spend is around $1,200/mo.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me — don't want to keep hitting your inbox.\n\nReality is your reviews are strong enough that you should be at the top of Google when someone searches \"{city} roofer.\" Every week you're not running ads, a competitor with worse reviews is buying that spot.\n\nIf you want to see what that'd look like for {business_name}, reply \"send info.\"\n\nOtherwise all good, won't bug you again.\n\n{sender_name}" },
    ],
  },
  "HVAC": {
    icon: "❄️", color: "#38BDF8", bg: "#062020", border: "#0A4A4A",
    set1: [
      { day: 0, subject: "{city} HVAC", body: "Hey {first_name},\n\nYou guys taking new service calls and installs right now, or booked out on the schedule?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} HVAC", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for HVAC contractors around {city} that put them at the top of Google when homeowners search \"AC repair near me.\" The guys I work with right now are averaging 40–60 new service calls and 6–10 installs a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nIf you want me to circle back before next season's rush, just reply \"later.\" If it's a no, reply \"no\" and I'll take you off the list.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at HVAC companies around {city}. Looks like you've been running a solid operation.\n\nQuick question — are you guys taking on new service calls and installs right now, or pretty booked out?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help HVAC contractors in {city} bring in more service calls and install jobs through Google and Facebook ads — especially during shoulder seasons when the schedule opens up.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox — totally get it, this time of year is brutal on your calendar.\n\nIf there's any interest in getting more service calls through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} HVAC", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most HVAC shops around {city}. But your Facebook is quiet and you're not running any paid ads.\n\nThat's leaving money on the table every time someone searches \"AC repair near me.\" I help HVAC contractors turn that into 40–60 extra service calls and 6–10 installs a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} HVAC", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with an HVAC contractor in a similar-size market — we turned on Google Local Services Ads and a Search campaign 6 weeks ago and they've booked 52 service calls and 9 full installs. Spend is around $1,500/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me — don't want to keep hitting your inbox.\n\nReality is HVAC is one of the highest-intent searches on Google. When someone's AC quits in July, they're calling whoever's at the top — and right now in {city}, that's not you.\n\nIf you want to see what that'd look like for {business_name}, reply \"send info.\"\n\nOtherwise all good, won't bug you again.\n\n{sender_name}" },
    ],
  },
  "Electrician": {
    icon: "⚡", color: "#ECC94B", bg: "#1A1A00", border: "#4A4400",
    set1: [
      { day: 0, subject: "{city} electricians", body: "Hey {first_name},\n\nYou guys still taking new service calls right now, or pretty booked?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} electricians", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for electricians around {city} that put them at the top of Google for \"electrician near me\" and panel upgrade searches. The guys I work with right now are averaging 30–50 extra service calls and 4–8 panel upgrades a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply \"later\" or \"no\" and I'll act accordingly.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at electricians around {city}. Looks like you've been running a solid operation.\n\nQuick question — are you guys taking new service calls right now, or pretty booked up?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help electricians in {city} bring in more service calls and panel upgrade jobs through Google and Facebook ads. EV chargers have been a big one lately — homeowners are spending serious money and calling whoever shows up first.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more service calls through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} electricians", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most electricians around {city}. But you're not showing up in paid search and your Facebook is quiet.\n\nThat's leaving money on the table — especially on panel upgrades and EV charger installs. I help electricians turn that into 30–50 extra service calls a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} electricians", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with an electrician in a similar-size market — we turned on Google LSA plus a panel upgrade search campaign 6 weeks ago and they've booked 41 service calls and 7 panel upgrades. Spend is around $1,100/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nReality is your reviews are strong enough that you should be at the top of Google when someone searches \"{city} electrician.\" Every week you're not running ads, a competitor with half your reviews is buying that spot.\n\nReply \"send info\" if you want a quick breakdown. Otherwise all good.\n\n{sender_name}" },
    ],
  },
  "Landscaping": {
    icon: "🌿", color: "#48BB78", bg: "#0A2018", border: "#1A6840",
    set1: [
      { day: 0, subject: "{city} lawn care", body: "Hey {first_name},\n\nYou guys still taking new accounts for the season, or pretty full on the route?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} lawn care", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for lawn care and landscaping companies around {city} that bring in new recurring accounts through Facebook (before-and-after posts convert like crazy) and Google. The guys I work with are averaging 15–30 new accounts a month in peak season.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nIf you want me to circle back before next spring, just reply \"later.\" If it's a no, reply \"no.\"\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at lawn care companies around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still taking on new accounts this season, or pretty full on the route?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help lawn care and landscaping companies in {city} bring in more recurring accounts through Facebook and Google ads. Before-and-after photos absolutely crush it on Facebook right now.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox — totally get it, this time of year is wild for you guys.\n\nIf there's any interest in getting more accounts through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} lawn care", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most lawn care companies around {city}. But your Facebook hasn't posted in weeks and you're not running ads.\n\nThat's a huge miss — before-and-after photos on Facebook are the single best performing ad type for your trade right now. I help lawn companies turn that into 15–30 new recurring accounts a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} lawn care", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a lawn care company in a similar-size market — we turned on a Facebook before/after campaign 6 weeks ago and they've added 23 new weekly accounts. Spend is around $800/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nEvery new account you pick up now is $600–$1,800/year in recurring revenue. Every week you're not running ads in {city}, a competitor is locking those accounts in for the rest of the season.\n\nReply \"send info\" if you want a quick breakdown.\n\n{sender_name}" },
    ],
  },
  "Tree Service": {
    icon: "🌳", color: "#48BB78", bg: "#0A2018", border: "#2E7D32",
    set1: [
      { day: 0, subject: "{city} tree service", body: "Hey {first_name},\n\nYou guys still taking new jobs right now, or pretty booked out?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} tree service", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for tree companies around {city} that show up at the top of Google when someone searches \"tree removal near me\" after a storm, plus Facebook campaigns for planned trimming work. The guys I work with are averaging 20–35 extra jobs a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply \"later\" or \"no\" and I'll act accordingly.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at tree services around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still taking on new jobs, or pretty booked?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help tree companies in {city} bring in more removal and trim jobs through Google and Facebook ads. Storm-response ads especially crush it — homeowners searching after a big wind event are ready to pay today.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more jobs through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} tree service", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most tree companies around {city}. But you're not running paid ads and your Facebook is quiet.\n\nThat's leaving money on the table every time a tree comes down after a storm. I help tree companies turn that into 20–35 extra jobs a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} tree service", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a tree company in a similar-size market — we turned on Google LSA plus a storm-trigger Facebook campaign 6 weeks ago and they've booked 28 jobs off it. Spend is around $900/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nTree work is one of the most lucrative trades per job — one $4K removal covers a month of ad spend. Every week you're not running in {city}, a guy with worse reviews is getting that call.\n\nReply \"send info\" if you want a quick breakdown.\n\n{sender_name}" },
    ],
  },
  "Construction": {
    icon: "🏗️", color: "#DD9D2A", bg: "#1A1200", border: "#D48C30",
    set1: [
      { day: 0, subject: "{city} contractors", body: "Hey {first_name},\n\nYou guys still booking new projects right now, or pretty slammed?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} contractors", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for contractors around {city} that bring in new residential and commercial projects through Google and Facebook. The guys I work with are averaging 8–15 qualified leads a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply \"later\" or \"no\" and I'll act accordingly.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at contractors around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still booking new projects, or pretty slammed?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help contractors in {city} bring in more qualified project leads through Google and Facebook ads. The contractors I work with are picking up residential and commercial projects without relying on word-of-mouth alone.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more projects through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} contractors", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most contractors around {city}. But your Facebook isn't active and you're not running any paid ads.\n\nThat's leaving projects on the table. I help contractors turn that into 8–15 qualified leads a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} contractors", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a contractor in a similar-size market — we turned on Google Search plus a Facebook campaign 6 weeks ago and they've booked 11 new projects. Average job size is $18K. Spend is around $1,400/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nOne project covers months of ad spend. Every week you're not running ads in {city}, a competitor is closing those jobs.\n\nReply \"send info\" if you want a quick breakdown.\n\n{sender_name}" },
    ],
  },
  "Painting": {
    icon: "🎨", color: "#ED64A6", bg: "#200010", border: "#6B1A40",
    set1: [
      { day: 0, subject: "{city} painters", body: "Hey {first_name},\n\nYou guys still booking new jobs right now, or pretty booked out?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} painters", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for painters around {city} that bring in interior and exterior jobs through Facebook (before-and-afters crush it) and Google. The guys I work with are averaging 10–18 new jobs a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply \"later\" or \"no\" and I'll act accordingly.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at painters around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still booking new jobs, or pretty full?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help painters in {city} bring in more interior and exterior jobs through Facebook and Google ads. Before/after photos of kitchen cabinets and full exteriors are the best-converting format I've ever run for your trade.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more jobs through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} painters", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most painters around {city}. But your Facebook isn't posting finished work and you're not running ads.\n\nThat's a huge miss — painted cabinet and exterior before/afters are some of the best-converting ads on Facebook. I help painters turn that into 10–18 extra jobs a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} painters", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a painter in a similar-size market — we turned on a Facebook before/after campaign 6 weeks ago and they've booked 14 jobs off it, averaging $4,200 a job. Spend is around $900/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nQuality painters get picked over low-ballers when homeowners can actually see the work. Every week you're not showing finished jobs in ads, a cheaper competitor is getting the call.\n\nReply \"send info\" if you want a quick breakdown.\n\n{sender_name}" },
    ],
  },
  "Concrete": {
    icon: "🪨", color: "#8A97AB", bg: "#000000", border: "#2A2A2A",
    set1: [
      { day: 0, subject: "{city} concrete", body: "Hey {first_name},\n\nYou guys still booking new jobs right now, or pretty slammed on the schedule?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} concrete", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for concrete contractors around {city} that bring in driveway, patio, and retaining wall jobs through Facebook and Google. The guys I work with right now are averaging 8–15 new jobs a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply \"later\" or \"no\" and I'll act accordingly.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at concrete contractors around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still booking new jobs, or pretty slammed?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help concrete contractors in {city} bring in more driveway, patio, and stamped concrete jobs through Facebook and Google ads.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more jobs through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} concrete", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most concrete contractors around {city}. But your Facebook isn't posting photos of finished work and you're not running ads.\n\nStamped concrete and patio photos are some of the highest-converting ad creative that exists. I help concrete contractors turn that into 8–15 extra jobs a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} concrete", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a concrete contractor in a similar-size market — we turned on a Facebook before/after campaign plus Google Search 6 weeks ago and they've booked 11 jobs off it, averaging $6,800 a job. Spend is around $1,100/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nConcrete is one of the highest-ticket residential trades — one patio job can cover months of ad spend. Every week you're not running ads in {city}, a competitor is closing those jobs.\n\nReply \"send info\" if you want a quick breakdown.\n\n{sender_name}" },
    ],
  },
  "Fencing": {
    icon: "🏡", color: "#B794F4", bg: "#120820", border: "#5B3FA0",
    set1: [
      { day: 0, subject: "{city} fence companies", body: "Hey {first_name},\n\nYou guys still booking new installs right now, or pretty full up on the schedule?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} fence companies", body: "Hey {first_name},\n\nFollowing up on my note last week.\n\nQuick context — I run ads for fence companies around {city} that bring in install jobs through Facebook and Google. The guys I work with are averaging 10–18 new jobs a month.\n\n{business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}" },
      { day: 12, subject: "close the file?", body: "Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply \"later\" or \"no\" and I'll act accordingly.\n\n{sender_name}" },
    ],
    set2: [
      { day: 0, subject: "quick question", body: "Hey {first_name},\n\nCame across {business_name} while looking at fence companies around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still booking new installs, or pretty full?\n\nAppreciate it,\n{sender_name}" },
      { day: 5, subject: "Re: quick question", body: "Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help fence companies in {city} bring in more install jobs through Facebook and Google ads. Finished-fence photos — especially vinyl and wrought iron — convert homeowners fast.\n\nNot trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}" },
      { day: 12, subject: "should I stop reaching out?", body: "Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more installs through online ads, just reply \"yes\" or \"maybe.\"\n\n{sender_name}" },
    ],
    set3: [
      { day: 0, subject: "{city} fence companies", body: "Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most fence companies around {city}. But your Facebook isn't showing finished work and you're not running ads.\n\nFence photos are scroll-stopping on Facebook. I help fence companies turn that into 10–18 extra installs a month.\n\nWorth a 10-min call next week?\n\n{sender_name}" },
      { day: 5, subject: "Re: {city} fence companies", body: "Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a fence company in a similar-size market — we turned on a Facebook finished-work campaign plus Google Search 6 weeks ago and they've booked 14 installs averaging $6,400 a job. Spend is around $1,000/month.\n\nHappy to walk you through exactly what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}" },
      { day: 12, subject: "worth a look or nah?", body: "Hey {first_name},\n\nLast note from me.\n\nEvery fence install is $4K+. Every week you're not running ads in {city}, a competitor with worse work is closing those jobs.\n\nReply \"send info\" if you want a quick breakdown.\n\n{sender_name}" },
    ],
  },
};

const GENERIC_TEMPLATES = (industry) => ({
  set1: [
    { day: 0, subject: `{city} ${industry.toLowerCase()}`, body: `Hey {first_name},\n\nYou guys still taking new jobs right now, or pretty booked?\n\n{sender_name}` },
    { day: 5, subject: `Re: {city} ${industry.toLowerCase()}`, body: `Hey {first_name},\n\nFollowing up on my note last week.\n\nI run ads for ${industry.toLowerCase()} businesses around {city} that bring in new jobs through Google and Facebook. {business_name} stood out, which is why I reached out.\n\nWorth a 10-minute call this week or next?\n\n{sender_name}` },
    { day: 12, subject: "close the file?", body: `Hey {first_name},\n\nHaven't heard back so I'm guessing now's not the right time.\n\nJust reply "later" or "no" and I'll act accordingly.\n\n{sender_name}` },
  ],
  set2: [
    { day: 0, subject: "quick question", body: `Hey {first_name},\n\nCame across {business_name} while looking at ${industry.toLowerCase()} businesses around {city}. Looks like you've been running a solid operation.\n\nQuick question — you guys still taking on new work, or pretty full?\n\nAppreciate it,\n{sender_name}` },
    { day: 5, subject: "Re: quick question", body: `Hey {first_name},\n\nWanted to follow up on my note from last week.\n\nI help ${industry.toLowerCase()} businesses in {city} bring in more jobs through Google and Facebook ads. Not trying to push anything — {business_name} just stood out. Open to a quick 10-minute call?\n\nThanks,\n{sender_name}` },
    { day: 12, subject: "should I stop reaching out?", body: `Hey {first_name},\n\nHaven't heard back so I don't want to keep cluttering your inbox.\n\nIf there's any interest in getting more jobs through online ads, just reply "yes" or "maybe."\n\n{sender_name}` },
  ],
  set3: [
    { day: 0, subject: `{city} ${industry.toLowerCase()}`, body: `Hey {first_name},\n\nLooked at {business_name}'s online presence — {review_count} Google reviews averaging {star_rating}, better than most ${industry.toLowerCase()} businesses around {city}. But you're not running paid ads.\n\nThat's leaving money on the table. I can help turn that into consistent new jobs every month.\n\nWorth a 10-min call next week?\n\n{sender_name}` },
    { day: 5, subject: `Re: {city} ${industry.toLowerCase()}`, body: `Hey {first_name},\n\nFigured I'd follow up in case this got buried.\n\nWorking with a ${industry.toLowerCase()} business in a similar-size market right now — we turned on Google and Facebook ads 6 weeks ago and they're booking consistently.\n\nHappy to walk you through what we did — 10 minutes, no pitch deck.\n\nNext Tuesday or Wednesday work?\n\n{sender_name}` },
    { day: 12, subject: "worth a look or nah?", body: `Hey {first_name},\n\nLast note from me.\n\nIf you want to see what running ads could look like for {business_name}, reply "send info" and I'll put together a quick breakdown.\n\nOtherwise all good, won't bug you again.\n\n{sender_name}` },
  ],
});

function getTemplates(industry) { return PLAYBOOK[industry] || GENERIC_TEMPLATES(industry); }
function getIndustryMeta(industry) {
  return PLAYBOOK[industry] || { icon: "🔩", color: "#8A97AB", bg: "#000000", border: "#2A2A2A" };
}

function fillVars(str, lead, senderName) {
  return str
    .replace(/{first_name}/g, lead.contactName || "there")
    .replace(/{business_name}/g, lead.businessName || "")
    .replace(/{city}/g, lead.city || "your area")
    .replace(/{sender_name}/g, senderName || "[Your Name]")
    .replace(/{review_count}/g, lead.reviewCount || "several")
    .replace(/{star_rating}/g, lead.rating || "4.5");
}

function chooseSet(lead) {
  if (lead.rating && lead.reviewCount >= 5) return "set3";
  return lead.emailSet || "set2";
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ALL_INDUSTRIES = Object.keys(PLAYBOOK).concat(["Other"]);
const STAGES = ["New Lead", "Contacted", "Replied", "Call Booked", "Closed", "Dead"];
const RADIUS_OPTIONS = [1, 2, 5, 10, 20, 50];

const INDUSTRY_KEYWORDS = {
  "Plumbing": ["plumber", "plumbing"],
  "Construction": ["general contractor", "construction"],
  "Electrician": ["electrician", "electrical"],
  "HVAC": ["hvac", "air conditioning", "heating"],
  "Roofing": ["roofing", "roofer"],
  "Landscaping": ["landscaping", "lawn care"],
  "Painting": ["painter", "painting"],
  "Concrete": ["concrete", "masonry"],
  "Fencing": ["fencing", "fence"],
  "Tree Service": ["tree service", "tree removal"],
  "Other": ["contractor"],
};

const STAGE_STYLE = {
  "New Lead":    { bg: "#1A1A1A", text: "#AAAAAA", border: "#333333" },
  "Contacted":   { bg: "#1E1E1E", text: "#CCCCCC", border: "#383838" },
  "Replied":     { bg: "#2A2A2A", text: "#DDDDDD", border: "#3A3A3A" },
  "Call Booked": { bg: "#271D05", text: "#D4A017", border: "#7A5A00" },
  "Closed":      { bg: "#0A2018", text: "#48BB78", border: "#1A6840" },
  "Dead":        { bg: "#111111", text: "#666666", border: "#2A2A2A" },
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const daysAgo = (d) => { if (!d) return null; const n = Math.floor((Date.now() - new Date(d)) / 86400000); return n === 0 ? "Today" : n === 1 ? "Yesterday" : `${n}d ago`; };
const hotScore = (l) => [!l.runningAds, !l.hasWebsite, !l.hasGoogleProfile].filter(Boolean).length;

// Google Places API calls go through a CORS-friendly proxy.
// We use the allorigins proxy which wraps the JSON response.
const PROXY = (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

async function gFetch(url) {
  // Try direct first (works if user has CORS disabled or uses an extension)
  try {
    const r = await fetch(url, { mode: "cors" });
    if (r.ok) return r.json();
  } catch (_) {}
  // Fall back to proxy
  const r = await fetch(PROXY(url));
  if (!r.ok) throw new Error(`Proxy error: ${r.status}`);
  const wrapper = await r.json();
  if (!wrapper.contents) throw new Error("Proxy returned empty response");
  return JSON.parse(wrapper.contents);
}

async function geocodeAddress(address, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  const data = await gFetch(url);
  if (data.status === "REQUEST_DENIED") throw new Error("API key denied — make sure Geocoding API is enabled in Google Cloud Console");
  if (data.status === "ZERO_RESULTS") throw new Error(`No results found for "${address}" — try a different location`);
  if (data.status !== "OK" || !data.results?.[0]) throw new Error(`Geocoding failed: ${data.status}`);
  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng, formattedAddress: data.results[0].formatted_address };
}

async function scrapeBusinesses({ apiKey, lat, lng, radiusMiles, industry, maxResults = 20 }) {
  const radiusMeters = Math.round(radiusMiles * 1609.34);
  const keywords = INDUSTRY_KEYWORDS[industry] || [industry.toLowerCase()];
  const allResults = []; const seenIds = new Set();

  for (const keyword of keywords.slice(0, 2)) {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusMeters}&keyword=${encodeURIComponent(keyword)}&type=establishment&key=${apiKey}`;
    let data;
    try {
      data = await gFetch(url);
    } catch (e) {
      throw new Error(`Scrape failed: ${e.message}`);
    }

    if (data.status === "REQUEST_DENIED") throw new Error(data.error_message || "API key denied — enable Places API in Google Cloud Console");
    if (data.status === "INVALID_REQUEST") throw new Error("Invalid request — check your API key and try again");
    if (!["OK", "ZERO_RESULTS"].includes(data.status)) throw new Error(`Places API error: ${data.status}`);

    for (const place of (data.results || [])) {
      if (seenIds.has(place.place_id)) continue;
      seenIds.add(place.place_id);
      const cityRaw = place.vicinity?.split(",") || [];
      const city = cityRaw.slice(-2).join(",").trim() || place.vicinity || "";
      allResults.push({
        id: uid(),
        placeId: place.place_id,
        businessName: place.name,
        contactName: "",
        city,
        industry,
        phone: place.formatted_phone_number || "",
        email: "",
        facebook: "",
        website: place.website || "",
        hasGoogleProfile: true,
        hasWebsite: !!(place.website),
        runningAds: false,
        rating: place.rating ?? null,
        reviewCount: place.user_ratings_total ?? 0,
        stage: "New Lead",
        emailSet: "set2",
        notes: `Scraped from Google Places.\nRating: ${place.rating ?? "N/A"} (${place.user_ratings_total ?? 0} reviews)\nAddress: ${place.vicinity || ""}`,
        addedDate: new Date().toISOString(),
        lastContacted: null,
        emailsSent: 0,
        scraped: true,
      });
      if (allResults.length >= maxResults) break;
    }
    if (allResults.length >= maxResults) break;
  }
  return allResults.slice(0, maxResults);
}

// ─── AD GENERATOR COMPONENT ──────────────────────────────────────────────────
function AdGenerator({ leads, settings, PLAYBOOK, fillVars, getTemplates }) {
  const [platform, setPlatform] = useState("meta"); // meta | google
  const [adType, setAdType] = useState("awareness"); // awareness | leads | retargeting | call
  const [selectedIndustry, setSelectedIndustry] = useState("Plumbing");
  const [selectedLead, setSelectedLead] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generatedAds, setGeneratedAds] = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [tone, setTone] = useState("professional"); // professional | casual | urgent | local

  const INDUSTRIES = Object.keys(PLAYBOOK);
  const AD_TYPES = {
    awareness:   { label: "Brand Awareness", desc: "Intro the business to cold audiences" },
    leads:       { label: "Lead Generation", desc: "Get form fills & calls from interested prospects" },
    retargeting: { label: "Retargeting",     desc: "Re-engage people who've visited or interacted" },
    call:        { label: "Call Now",        desc: "Drive direct phone calls immediately" },
  };
  const TONES = { professional: "Professional", casual: "Casual & Friendly", urgent: "Urgent", local: "Hyper-Local" };

  const clientLeads = leads.filter(l => l.industry === selectedIndustry);
  const activeLead = selectedLead || clientLeads[0] || null;

  const META_AD_SPECS = {
    awareness:   [{ name: "Primary Text", maxChars: 125 }, { name: "Headline", maxChars: 40 }, { name: "Description", maxChars: 30 }],
    leads:       [{ name: "Primary Text", maxChars: 125 }, { name: "Headline", maxChars: 40 }, { name: "Description", maxChars: 30 }, { name: "CTA", maxChars: 20 }],
    retargeting: [{ name: "Primary Text", maxChars: 125 }, { name: "Headline", maxChars: 40 }, { name: "Description", maxChars: 30 }],
    call:        [{ name: "Primary Text", maxChars: 125 }, { name: "Headline", maxChars: 40 }, { name: "CTA", maxChars: 20 }],
  };

  const GOOGLE_AD_SPECS = {
    awareness:   [{ name: "Headline 1", maxChars: 30 }, { name: "Headline 2", maxChars: 30 }, { name: "Headline 3", maxChars: 30 }, { name: "Description 1", maxChars: 90 }, { name: "Description 2", maxChars: 90 }],
    leads:       [{ name: "Headline 1", maxChars: 30 }, { name: "Headline 2", maxChars: 30 }, { name: "Headline 3", maxChars: 30 }, { name: "Description 1", maxChars: 90 }, { name: "Description 2", maxChars: 90 }],
    retargeting: [{ name: "Headline 1", maxChars: 30 }, { name: "Headline 2", maxChars: 30 }, { name: "Description 1", maxChars: 90 }],
    call:        [{ name: "Headline 1", maxChars: 30 }, { name: "Headline 2", maxChars: 30 }, { name: "Headline 3", maxChars: 30 }, { name: "Description 1", maxChars: 90 }, { name: "Phone CTA", maxChars: 25 }],
  };

  const specs = platform === "meta" ? META_AD_SPECS[adType] : GOOGLE_AD_SPECS[adType];

  const buildPrompt = () => {
    const meta = PLAYBOOK[selectedIndustry] || {};
    const city = activeLead?.city || "your city";
    const biz = activeLead?.businessName || `a ${selectedIndustry.toLowerCase()} business`;
    const rating = activeLead?.rating ? `${activeLead.rating} stars (${activeLead.reviewCount} reviews)` : null;
    const toneInstructions = {
      professional: "Use clean, professional language. Authoritative and trustworthy.",
      casual: "Use friendly, conversational language. Approachable and warm.",
      urgent: "Create urgency. Use phrases like 'limited spots', 'book today', 'don't wait'.",
      local: "Heavily emphasize the local city and neighborhood. Make it hyper-specific to the area.",
    }[tone];

    const specsList = specs.map(s => `- ${s.name} (max ${s.maxChars} chars)`).join("\n");

    return `You are an expert digital advertising copywriter specializing in blue-collar home service businesses.

Create ${platform === "meta" ? "Facebook/Instagram" : "Google"} ad copy for a ${selectedIndustry.toLowerCase()} business in ${city}.

Business: ${biz}${rating ? `\nRating: ${rating}` : ""}
Ad objective: ${AD_TYPES[adType].label} — ${AD_TYPES[adType].desc}
Tone: ${toneInstructions}
${customPrompt ? `Additional context: ${customPrompt}` : ""}

Generate 3 DIFFERENT ad variations. Each variation must have ALL of these fields:
${specsList}

STRICT rules:
- NEVER exceed the character limits — count carefully
- Each variation must be meaningfully different (not just word swaps)
- Focus on benefits not features (more jobs, more calls, more revenue)
- Include a strong CTA in every ad
- Make it feel local and personal, not generic agency copy

Respond ONLY in JSON format like this (no markdown, no preamble):
{
  "variations": [
    {
      "name": "Variation A",
      "fields": {
        "Primary Text": "...",
        "Headline": "...",
        "Description": "..."
      }
    }
  ]
}`;
  };

  const generateAds = async () => {
    setGenerating(true);
    setGeneratedAds([]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const rawText = data.content?.filter(c => c.type === "text").map(c => c.text).join("") || "";

      // Strip markdown fences if present
      const clean = rawText.replace(/^```(?:json)?\s*/m, "").replace(/\s*```\s*$/m, "").trim();

      // Find the JSON object
      const jsonStart = clean.indexOf("{");
      const jsonEnd = clean.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) throw new Error("No JSON found in response");
      const parsed = JSON.parse(clean.slice(jsonStart, jsonEnd + 1));

      if (!parsed.variations?.length) throw new Error("No variations returned — try again");
      setGeneratedAds(parsed.variations);
    } catch (e) {
      setGeneratedAds([{
        name: "Error",
        fields: { "What went wrong": e.message || "Unknown error. Check your connection and try again." }
      }]);
    }
    setGenerating(false);
  };

  const copyField = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = (variation) => {
    const text = Object.entries(variation.fields).map(([k, v]) => `${k}:\n${v}`).join("\n\n");
    navigator.clipboard.writeText(text);
  };

  const charColor = (text, max) => {
    const len = (text || "").length;
    if (len > max) return "#FC8181";
    if (len > max * 0.9) return "#D4A017";
    return "#48BB78";
  };

  return (
    <div className="fi" style={{ maxWidth: "900px" }}>
      <div style={{ marginBottom: "22px" }}>
        <div style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "-0.01em", marginBottom: "3px", color: "#E8EDF5" }}>Ad Generator</div>
        <div style={{ fontSize: "13px", color: "#999999" }}>Generate platform-specific ad copy for your clients using AI — Meta and Google specs built in.</div>
      </div>

      {/* Config panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>

        {/* Platform */}
        <div className="card" style={{ padding: "16px" }}>
          <div className="lbl">Platform</div>
          <div style={{ display: "flex", gap: "8px" }}>
            {[["meta","Meta / Facebook"],["google","Google Ads"]].map(([p, label]) => (
              <button key={p} className="btn" onClick={() => setPlatform(p)} style={{ flex: 1, justifyContent: "center", padding: "8px", fontSize: "12px", fontWeight: platform === p ? "700" : "400", background: platform === p ? "#FFFFFF" : "#0D0D0D", color: platform === p ? "#000000" : "#999999", border: `1px solid ${platform === p ? "#FFFFFF" : "#2A2A2A"}` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Ad type */}
        <div className="card" style={{ padding: "16px" }}>
          <div className="lbl">Ad Objective</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {Object.entries(AD_TYPES).map(([key, { label }]) => (
              <button key={key} className="btn" onClick={() => setAdType(key)} style={{ padding: "5px 12px", fontSize: "11px", fontWeight: adType === key ? "700" : "400", background: adType === key ? "#FFFFFF" : "#0D0D0D", color: adType === key ? "#000000" : "#999999", border: `1px solid ${adType === key ? "#FFFFFF" : "#2A2A2A"}` }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Industry + client */}
        <div className="card" style={{ padding: "16px" }}>
          <div className="lbl">Industry</div>
          <select value={selectedIndustry} onChange={e => { setSelectedIndustry(e.target.value); setSelectedLead(null); }} style={{ marginBottom: "10px" }}>
            {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
          </select>
          {clientLeads.length > 0 && (
            <>
              <div className="lbl" style={{ marginTop: "8px" }}>Client (optional)</div>
              <select value={activeLead?.id || ""} onChange={e => setSelectedLead(clientLeads.find(l => l.id === e.target.value) || null)}>
                <option value="">Generic {selectedIndustry} Business</option>
                {clientLeads.map(l => <option key={l.id} value={l.id}>{l.businessName}{l.city ? ` — ${l.city}` : ""}</option>)}
              </select>
            </>
          )}
        </div>

        {/* Tone + extra context */}
        <div className="card" style={{ padding: "16px" }}>
          <div className="lbl">Tone</div>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "10px" }}>
            {Object.entries(TONES).map(([key, label]) => (
              <button key={key} className="btn" onClick={() => setTone(key)} style={{ padding: "4px 10px", fontSize: "11px", fontWeight: tone === key ? "700" : "400", background: tone === key ? "#FFFFFF" : "#0D0D0D", color: tone === key ? "#000000" : "#999999", border: `1px solid ${tone === key ? "#FFFFFF" : "#2A2A2A"}` }}>
                {label}
              </button>
            ))}
          </div>
          <div className="lbl">Extra Context (optional)</div>
          <textarea value={customPrompt} onChange={e => setCustomPrompt(e.target.value)} placeholder="e.g. Spring promo, 20% off first service, targeting homeowners 35-65..." rows={2} style={{ fontSize: "12px" }} />
        </div>
      </div>

      {/* Generate button */}
      <button className="btn" onClick={generateAds} disabled={generating} style={{ background: "#FFFFFF", color: "#000000", padding: "11px 32px", fontSize: "14px", fontWeight: "700", marginBottom: "24px", width: "100%", justifyContent: "center" }}>
        {generating ? <><span className="spin">⟳</span> Generating 3 ad variations…</> : "✦ Generate Ad Copy"}
      </button>

      {/* Spec reference */}
      {!generating && generatedAds.length === 0 && (
        <div className="card" style={{ padding: "16px", marginBottom: "16px" }}>
          <div className="lbl" style={{ marginBottom: "12px" }}>
            {platform === "meta" ? "Meta" : "Google Ads"} · {AD_TYPES[adType].label} — Field Specs
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {specs.map(s => (
              <div key={s.name} style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: "6px", padding: "8px 12px", fontSize: "12px" }}>
                <div style={{ fontWeight: "600", color: "#CCCCCC", marginBottom: "2px" }}>{s.name}</div>
                <div style={{ color: "#777777" }}>Max {s.maxChars} chars</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generated ads */}
      {generatedAds.length > 0 && (
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#999999", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
            {generatedAds.length} Variations Generated · {platform === "meta" ? "Meta" : "Google"} · {AD_TYPES[adType].label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {generatedAds.map((variation, vIdx) => (
              <div key={vIdx} className="card" style={{ padding: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#E8EDF5" }}>{variation.name}</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button className="btn" onClick={() => copyAll(variation)} style={{ background: "#FFFFFF", color: "#000000", padding: "5px 12px", fontSize: "11px", fontWeight: "700" }}>Copy All</button>
                    <button className="btn" onClick={generateAds} style={{ background: "#0D0D0D", color: "#999999", padding: "5px 12px", fontSize: "11px", border: "1px solid #2A2A2A" }}>Regenerate</button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {Object.entries(variation.fields).map(([fieldName, fieldValue], fIdx) => {
                    const spec = specs.find(s => s.name === fieldName);
                    const maxChars = spec?.maxChars || 999;
                    const len = (fieldValue || "").length;
                    const copyKey = `${vIdx}-${fIdx}`;
                    return (
                      <div key={fieldName} style={{ background: "#000000", border: "1px solid #1A1A1A", borderRadius: "6px", padding: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <div style={{ fontSize: "10px", fontWeight: "700", color: "#777777", letterSpacing: "0.08em", textTransform: "uppercase" }}>{fieldName}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "10px", fontWeight: "700", color: charColor(fieldValue, maxChars) }}>{len}/{maxChars}</span>
                            <button className="btn" onClick={() => copyField(fieldValue, copyKey)} style={{ background: "#1A1A1A", color: "#AAAAAA", padding: "2px 8px", fontSize: "10px", border: "1px solid #2A2A2A" }}>
                              {copiedIdx === copyKey ? "✓" : "Copy"}
                            </button>
                          </div>
                        </div>
                        <div style={{ fontSize: "13px", color: "#E8EDF5", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{fieldValue}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button className="btn" onClick={generateAds} disabled={generating} style={{ background: "#0D0D0D", color: "#CCCCCC", padding: "10px 24px", fontSize: "13px", border: "1px solid #2A2A2A", marginTop: "16px", width: "100%", justifyContent: "center" }}>
            {generating ? <><span className="spin">⟳</span> Generating…</> : "↻ Generate New Variations"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function StayBooked() {
  const [tab, setTab] = useState("pipeline");
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [industryFilter, setIndustryFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grouped"); // grouped | cards | list
  const [settings, setSettings] = useState({ apiKey: "", senderName: "", senderEmail: "" });
  const [scrapeConfig, setScrapeConfig] = useState({ location: "", radius: 5, industry: "Plumbing", maxResults: 20 });
  const [scrapeResults, setScrapeResults] = useState([]);
  const [scrapeSelected, setScrapeSelected] = useState(new Set());
  const [scraping, setScraping] = useState(false);
  const [scrapeError, setScrapeError] = useState("");
  const [scrapeStep, setScrapeStep] = useState("idle");
  const [emailLog, setEmailLog] = useState([]);
  const [copiedMsg, setCopiedMsg] = useState(null);
  const [previewEmail, setPreviewEmail] = useState(null);
  const [bulkSending, setBulkSending] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(new Set(ALL_INDUSTRIES));
  const [teamMembers, setTeamMembers] = useState([
    { id: "owner", name: "You (Owner)", email: "", role: "Owner", status: "active", joined: new Date().toISOString() }
  ]);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "Member" });
  const [memberError, setMemberError] = useState("");
  const [memberAdded, setMemberAdded] = useState(false);

  // Ads Dashboard state
  const [adClients, setAdClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [adClientForm, setAdClientForm] = useState({ name: "", metaAdAccountId: "", metaAccessToken: "", googleCustomerId: "", googleDevToken: "", platform: "both" });
  const [addingClient, setAddingClient] = useState(false);
  const [adClientError, setAdClientError] = useState("");
  const [adsLoading, setAdsLoading] = useState(false);
  const [adsData, setAdsData] = useState(null);
  const [adsError, setAdsError] = useState("");
  const [adsPlatform, setAdsPlatform] = useState("meta"); // meta | google
  const [adsDateRange, setAdsDateRange] = useState("last_7d");

  const addMember = () => {
    setMemberError("");
    if (!newMember.name.trim()) { setMemberError("Name is required."); return; }
    if (!newMember.email.trim() || !newMember.email.includes("@")) { setMemberError("A valid email is required."); return; }
    if (teamMembers.some(m => m.email.toLowerCase() === newMember.email.toLowerCase())) { setMemberError("That email is already on the team."); return; }
    setTeamMembers(prev => [...prev, { id: uid(), name: newMember.name.trim(), email: newMember.email.trim(), role: newMember.role, status: "invited", joined: new Date().toISOString() }]);
    setNewMember({ name: "", email: "", role: "Member" });
    setMemberAdded(true);
    setTimeout(() => setMemberAdded(false), 3000);
  };

  const removeMember = (id) => setTeamMembers(prev => prev.filter(m => m.id !== id));

  const updateMemberRole = (id, role) => setTeamMembers(prev => prev.map(m => m.id === id ? { ...m, role } : m));

  const addAdClient = () => {
    setAdClientError("");
    if (!adClientForm.name.trim()) { setAdClientError("Client name is required."); return; }
    const client = { id: uid(), ...adClientForm, name: adClientForm.name.trim(), addedDate: new Date().toISOString() };
    setAdClients(prev => [client, ...prev]);
    setAdClientForm({ name: "", metaAdAccountId: "", metaAccessToken: "", googleCustomerId: "", googleDevToken: "", platform: "both" });
    setAddingClient(false);
    setSelectedClient(client);
  };

  const removeAdClient = (id) => { setAdClients(prev => prev.filter(c => c.id !== id)); if (selectedClient?.id === id) setSelectedClient(null); };

  const fetchMetaAds = async (client, dateRange) => {
    const ranges = { last_7d: 7, last_14d: 14, last_30d: 30, last_90d: 90 };
    const days = ranges[dateRange] || 7;
    const since = new Date(Date.now() - days * 86400000).toISOString().split("T")[0];
    const until = new Date().toISOString().split("T")[0];
    const fields = "campaign_name,impressions,clicks,spend,cpc,ctr,reach,frequency,actions";
    const timeRange = encodeURIComponent(JSON.stringify({ since, until }));
    const url = `https://graph.facebook.com/v19.0/act_${client.metaAdAccountId}/insights?fields=${fields}&time_range=${timeRange}&level=campaign&access_token=${client.metaAccessToken}`;
    // Facebook API supports CORS so direct fetch works
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) throw new Error(`Meta API: ${data.error.message} (code ${data.error.code})`);
    return data.data || [];
  };

  const fetchGoogleAds = async (client, dateRange) => {
    // Google Ads API requires a backend proxy - we show setup instructions instead
    throw new Error("google_proxy_needed");
  };

  const loadAds = async (client, platform, dateRange) => {
    if (!client) return;
    setAdsLoading(true); setAdsError(""); setAdsData(null);
    try {
      let data = null;
      if (platform === "meta") {
        if (!client.metaAdAccountId || !client.metaAccessToken) { setAdsError("meta_missing_creds"); setAdsLoading(false); return; }
        data = await fetchMetaAds(client, dateRange);
      } else {
        if (!client.googleCustomerId || !client.googleDevToken) { setAdsError("google_missing_creds"); setAdsLoading(false); return; }
        await fetchGoogleAds(client, dateRange);
      }
      setAdsData(data);
    } catch (e) {
      if (e.message === "google_proxy_needed") setAdsError("google_proxy_needed");
      else setAdsError(e.message || "Failed to load ads data.");
    }
    setAdsLoading(false);
  };

  const updateAdClient = useCallback((id, updates) => {
    setAdClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    setSelectedClient(prev => prev?.id === id ? { ...prev, ...updates } : prev);
  }, []);

  const deleteLead = (id) => { setLeads(prev => prev.filter(l => l.id !== id)); setDetailOpen(false); setSelectedLead(null); };
  const openDetail = (lead) => { setSelectedLead(lead); setDetailOpen(true); setPreviewEmail({ emailIndex: 0, set: chooseSet(lead) }); };

  const runScrape = async () => {
    if (!settings.apiKey) { setScrapeError("Paste your Google Places API key in Settings first."); return; }
    if (!scrapeConfig.location) { setScrapeError("Enter a city or address."); return; }
    setScraping(true); setScrapeError(""); setScrapeResults([]); setScrapeSelected(new Set());
    try {
      setScrapeStep("geocoding");
      const { lat, lng } = await geocodeAddress(scrapeConfig.location, settings.apiKey);
      setScrapeStep("searching");
      const results = await scrapeBusinesses({ apiKey: settings.apiKey, lat, lng, radiusMiles: scrapeConfig.radius, industry: scrapeConfig.industry, maxResults: parseInt(scrapeConfig.maxResults) });
      setScrapeResults(results);
      setScrapeSelected(new Set(results.map(r => r.id)));
      setScrapeStep("done");
    } catch (e) { setScrapeError(e.message || "Scrape failed."); setScrapeStep("idle"); }
    setScraping(false);
  };

  const importSelected = () => {
    const toAdd = scrapeResults.filter(r => scrapeSelected.has(r.id));
    const existingIds = new Set(leads.map(l => l.placeId).filter(Boolean));
    const fresh = toAdd.filter(r => !existingIds.has(r.placeId));
    setLeads(prev => [...fresh, ...prev]);
    setScrapeResults([]); setScrapeSelected(new Set()); setScrapeStep("idle");
    setTab("pipeline");
  };

  const sendEmail = (lead, emailIndex, set) => {
    const templates = getTemplates(lead.industry);
    const template = templates[set][emailIndex];
    if (!template) return;
    const subject = encodeURIComponent(fillVars(template.subject, lead, settings.senderName));
    const body = encodeURIComponent(fillVars(template.body, lead, settings.senderName));
    const to = lead.email ? encodeURIComponent(lead.email) : "";
    window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_blank");
    updateLead(lead.id, { lastContacted: new Date().toISOString(), emailsSent: (lead.emailsSent || 0) + 1, stage: lead.stage === "New Lead" ? "Contacted" : lead.stage });
    setEmailLog(prev => [{ id: uid(), leadName: lead.businessName, emailNum: emailIndex + 1, set: set.replace("set", "Set "), time: new Date().toISOString() }, ...prev]);
  };

  const copyEmailText = (lead, emailIndex, set) => {
    const templates = getTemplates(lead.industry);
    const template = templates[set][emailIndex];
    if (!template) return;
    const text = `Subject: ${fillVars(template.subject, lead, settings.senderName)}\n\n${fillVars(template.body, lead, settings.senderName)}`;
    navigator.clipboard.writeText(text);
    setCopiedMsg(`${lead.id}-${emailIndex}-${set}`);
    setTimeout(() => setCopiedMsg(null), 2000);
  };

  const toggleGroup = (industry) => {
    setExpandedGroups(prev => { const s = new Set(prev); s.has(industry) ? s.delete(industry) : s.add(industry); return s; });
  };

  // Filtering
  const baseFiltered = leads.filter(l => {
    const ms = stageFilter === "All" || l.stage === stageFilter;
    const mi = industryFilter === "All" || l.industry === industryFilter;
    const mq = !search || l.businessName.toLowerCase().includes(search.toLowerCase()) || (l.city || "").toLowerCase().includes(search.toLowerCase());
    return ms && mi && mq;
  });

  // Group by industry
  const grouped = ALL_INDUSTRIES.reduce((acc, ind) => {
    const inGroup = baseFiltered.filter(l => l.industry === ind);
    if (inGroup.length > 0) acc[ind] = inGroup;
    return acc;
  }, {});
  const otherLeads = baseFiltered.filter(l => !ALL_INDUSTRIES.includes(l.industry));
  if (otherLeads.length > 0) grouped["Other"] = otherLeads;

  const stageCounts = STAGES.reduce((a, s) => ({ ...a, [s]: leads.filter(l => l.stage === s).length }), {});
  const industryCounts = ALL_INDUSTRIES.reduce((a, i) => ({ ...a, [i]: leads.filter(l => l.industry === i).length }), {});
  const newLeads = baseFiltered.filter(l => l.stage === "New Lead");

  // ─── LEAD CARD ───────────────────────────────────────────────────────────────
  const LeadCard = ({ lead, compact = false }) => {
    const score = hotScore(lead);
    const sc = STAGE_STYLE[lead.stage];
    const meta = getIndustryMeta(lead.industry);
    const templates = getTemplates(lead.industry);
    const set = chooseSet(lead);
    const nextEmailIdx = lead.emailsSent || 0;
    const nextTemplate = templates[set]?.[nextEmailIdx];
    return (
      <div onClick={() => openDetail(lead)} style={{ background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: "8px", padding: compact ? "11px 13px" : "14px", cursor: "pointer", transition: "box-shadow 0.15s, border-color 0.15s, transform 0.12s" }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)"; e.currentTarget.style.borderColor = "#333333"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#2A2A2A"; e.currentTarget.style.transform = "none"; }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <div style={{ flex: 1, minWidth: 0, paddingRight: "8px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#E8EDF5", marginBottom: "2px", display: "flex", alignItems: "center", gap: "5px" }}>
              {score >= 2 && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F87171", flexShrink: 0, boxShadow: "0 0 6px #F87171" }} />}
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.businessName}</span>
            </div>
            <div style={{ fontSize: "11px", color: "#999999" }}>{lead.city || "No city"}{lead.rating ? ` · ★ ${lead.rating}` : ""}</div>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 8px", borderRadius: "20px", fontSize: "9px", fontWeight: "600", letterSpacing: "0.05em", textTransform: "uppercase", border: "1px solid", background: sc.bg, color: sc.text, borderColor: sc.border, whiteSpace: "nowrap" }}>{lead.stage}</span>
        </div>

        {!compact && nextTemplate && (
          <div style={{ background: "#000000", border: "1px solid #2A2A2A", borderRadius: "5px", padding: "6px 9px", marginBottom: "8px" }}>
            <div style={{ fontSize: "9px", color: "#AAAAAA", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Next · Day {nextTemplate.day}</div>
            <div style={{ fontSize: "11px", color: "#8A97AB", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>"{nextTemplate.subject.replace(/{city}/g, lead.city || "city")}"</div>
          </div>
        )}

        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {lead.email && <span style={{ fontSize: "9px", fontWeight: "700", background: "#1A1A1A", color: "#FFFFFF", padding: "2px 6px", borderRadius: "3px" }}>Email</span>}
          {lead.emailsSent > 0 && <span style={{ fontSize: "9px", fontWeight: "700", background: "#0A2018", color: "#48BB78", padding: "2px 6px", borderRadius: "3px" }}>{lead.emailsSent}/3 sent</span>}
          {lead.scraped && <span style={{ fontSize: "9px", fontWeight: "700", background: "#141414", color: "#999999", padding: "2px 6px", borderRadius: "3px" }}>Scraped</span>}
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000000", fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", color: "#E8EDF5", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #444444; border-radius: 2px; }
        .btn { cursor: pointer; border: none; font-family: inherit; font-weight: 500; transition: all 0.13s; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; }
        .btn:hover { filter: brightness(0.93); } .btn:active { transform: scale(0.98); } .btn:disabled { opacity: 0.4; cursor: not-allowed; }
        input, select, textarea { background: #111111; border: 1px solid #2A2A2A; color: #E8EDF5; font-family: inherit; font-size: 13px; border-radius: 6px; padding: 8px 12px; outline: none; width: 100%; transition: border-color 0.13s, box-shadow 0.13s; }
        input:focus, select:focus, textarea:focus { border-color: #888888; box-shadow: 0 0 0 3px rgba(255,255,255,0.08); }
        .card { background: #111111; border: 1px solid #2A2A2A; border-radius: 10px; }
        .lbl { font-size: 11px; font-weight: 600; color: #AAAAAA; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 5px; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .g3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media(max-width:700px){.g2,.g3{grid-template-columns:1fr;}}
        input::placeholder, textarea::placeholder { color: #666666; } .check { width: 15px; height: 15px; cursor: pointer; accent-color: #FFFFFF; flex-shrink: 0; }
        .sh { font-size: 10px; font-weight: 700; color: #AAAAAA; letter-spacing: 0.1em; text-transform: uppercase; padding-bottom: 10px; border-bottom: 1px solid #2A2A2A; margin-bottom: 14px; }
        .spin { animation: spin 1s linear infinite; display: inline-block; } @keyframes spin { to { transform: rotate(360deg); } }
        .fi { animation: fi 0.18s ease; } @keyframes fi { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }
        .row-h { transition: background 0.1s; } .row-h:hover { background: #141414; }
        .set-btn { cursor: pointer; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; transition: all 0.13s; border: 1px solid #2A2A2A; background: #0A0A0A; color: #999999; }
        .set-btn.active { background: #222222; color: #FFFFFF; border-color: #444444; }
        .prog { height: 3px; background: #2A2A2A; border-radius: 2px; overflow: hidden; margin-top: 6px; }
        .prog-fill { height: 100%; background: #FFFFFF; border-radius: 2px; transition: width 0.3s; }
        .sidebar-item { cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 6px; font-size: 13px; transition: all 0.12s; user-select: none; }
        .sidebar-item:hover { background: #1C1C1C; }
        .sidebar-item.active { background: #FFFFFF; color: #000000 !important; }
        .industry-group-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; cursor: pointer; border-radius: 8px; transition: background 0.12s; margin-bottom: 6px; }
        .industry-group-header:hover { background: #1A1A1A; }
      `}</style>

      {/* TOP NAV */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid #2A2A2A", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px", flexShrink: 0, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "30px", height: "30px", background: "#FFFFFF", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" rx="4" fill="#000"/>
                <text x="9" y="13" textAnchor="middle" fontFamily="'IBM Plex Sans',sans-serif" fontWeight="700" fontSize="10" fill="#FFFFFF">SB</text>
              </svg>
            </div>
            <span style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "-0.01em", color: "#E8EDF5" }}>StayBooked<span style={{fontSize:"10px",color:"#777777",marginLeft:"2px"}}>.app</span></span>
          </div>
          <div style={{ width: "1px", height: "14px", background: "#333333" }} />
          {[["pipeline","Pipeline"],["scraper","🔍 Scraper"],["ads","📊 Ads"],["adgen","✍ Ad Generator"],["settings","⚙ Settings"]].map(([id, label]) => (
            <button key={id} className="btn" onClick={() => setTab(id)} style={{ padding: "4px 11px", fontSize: "12px", background: tab === id ? "#FFFFFF" : "transparent", color: tab === id ? "#000000" : "#999999", fontWeight: tab === id ? "600" : "400" }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#AAAAAA" }}>{leads.length} leads</span>
          {tab === "pipeline" && newLeads.length > 0 && (
            <button className="btn" disabled={bulkSending} style={{ background: "#1A1A1A", color: "#FFFFFF", padding: "6px 12px", fontSize: "12px", border: "1px solid #333333" }}>
              {bulkSending ? <><span className="spin">⟳</span> Sending…</> : `✉ Bulk Send (${newLeads.length})`}
            </button>
          )}
        </div>
      </div>

      {/* STAGE FILTER STRIP */}
      <div style={{ background: "#0D0D0D", borderBottom: "1px solid #2A2A2A", padding: "0 20px", display: "flex", overflowX: "auto", flexShrink: 0 }}>
        {["All", ...STAGES].map(s => {
          const count = s === "All" ? leads.length : (stageCounts[s] || 0);
          const active = stageFilter === s;
          return (
            <div key={s} onClick={() => setStageFilter(s)} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", borderBottom: active ? "2px solid #FFFFFF" : "2px solid transparent", color: active ? "#E8EDF5" : "#999999", fontWeight: active ? "600" : "400", fontSize: "12px", whiteSpace: "nowrap", marginBottom: "-1px", transition: "color 0.12s", userSelect: "none" }}>
              {s}
              <span style={{ fontSize: "10px", fontWeight: "700", padding: "1px 5px", borderRadius: "8px", background: active ? "#FFFFFF" : "#141414", color: active ? "#fff" : "#777777", minWidth: "16px", textAlign: "center" }}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* MAIN BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* LEFT SIDEBAR — Industry filter */}
        {tab === "pipeline" && (
          <div style={{ width: "210px", flexShrink: 0, borderRight: "1px solid #2A2A2A", background: "#0D0D0D", overflowY: "auto", padding: "16px 10px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#AAAAAA", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 6px", marginBottom: "8px" }}>Occupation</div>

            {/* All */}
            <div className={`sidebar-item ${industryFilter === "All" ? "active" : ""}`} onClick={() => setIndustryFilter("All")} style={{ color: industryFilter === "All" ? "#000000" : "#E8EDF5", justifyContent: "space-between" }}>
              <span>All Trades</span>
              <span style={{ fontSize: "11px", fontWeight: "700", background: industryFilter === "All" ? "rgba(255,255,255,0.15)" : "#1A1A1A", color: industryFilter === "All" ? "#FFFFFF" : "#777777", padding: "1px 7px", borderRadius: "10px" }}>{leads.length}</span>
            </div>

            <div style={{ height: "1px", background: "#333333", margin: "10px 0" }} />

            {ALL_INDUSTRIES.filter(i => i !== "Other").map(industry => {
              const meta = getIndustryMeta(industry);
              const count = industryCounts[industry] || 0;
              const active = industryFilter === industry;
              return (
                <div key={industry} className={`sidebar-item ${active ? "active" : ""}`} onClick={() => setIndustryFilter(industry)} style={{ color: active ? "#000000" : "#E8EDF5", justifyContent: "space-between", marginBottom: "2px" }}>
                  <span style={{ fontSize: "12px" }}>{industry}</span>
                  {count > 0 && <span style={{ fontSize: "11px", fontWeight: "700", background: active ? "rgba(255,255,255,0.2)" : "#1A1A1A", color: active ? "#0D0D0D" : "#777777", padding: "1px 7px", borderRadius: "10px", flexShrink: 0 }}>{count}</span>}
                </div>
              );
            })}

            <div style={{ height: "1px", background: "#333333", margin: "10px 0" }} />

            {/* View mode */}
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#AAAAAA", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 6px", marginBottom: "8px" }}>View</div>
            {[["grouped", "⊞ Grouped"], ["cards", "▦ Cards"], ["list", "≡ List"]].map(([mode, label]) => (
              <div key={mode} className={`sidebar-item ${viewMode === mode ? "active" : ""}`} onClick={() => setViewMode(mode)} style={{ color: viewMode === mode ? "#0D0D0D" : "#8A97AB", fontSize: "12px", marginBottom: "2px" }}>{label}</div>
            ))}
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>

          {/* ══ PIPELINE ══ */}
          {tab === "pipeline" && (
            <div className="fi">
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or city…" style={{ maxWidth: "240px" }} />
                <span style={{ fontSize: "12px", color: "#AAAAAA", marginLeft: "4px" }}>{baseFiltered.length} leads</span>
              </div>

              {leads.length === 0 ? (
                <div style={{ textAlign: "center", padding: "72px 20px" }}>
                  <div style={{ width: "52px", height: "52px", background: "#EDF2F7", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "24px" }}>🔧</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>No leads yet</div>
                  <div style={{ fontSize: "13px", color: "#999999", marginBottom: "20px" }}>Use the Scraper tab to find and import businesses</div>
                  <button className="btn" onClick={() => setTab("scraper")} style={{ background: "#FFFFFF", color: "#000000", padding: "10px 22px", fontSize: "13px" }}>Go to Scraper →</button>
                </div>
              ) : baseFiltered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#AAAAAA", fontSize: "13px" }}>No leads match your current filters.</div>
              ) : (

                /* ── GROUPED VIEW ── */
                viewMode === "grouped" ? (
                  <div>
                    {Object.entries(grouped).map(([industry, groupLeads]) => {
                      const meta = getIndustryMeta(industry);
                      const expanded = expandedGroups.has(industry);
                      const hotCount = groupLeads.filter(l => hotScore(l) >= 2).length;
                      return (
                        <div key={industry} style={{ marginBottom: "20px" }}>
                          {/* Group header */}
                          <div className="industry-group-header" onClick={() => toggleGroup(industry)} style={{ background: expanded ? meta.bg : "#000000", border: `1px solid ${expanded ? meta.border : "#2A2A2A"}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div>
                                <div style={{ fontSize: "14px", fontWeight: "700", color: meta.color }}>{industry}</div>
                                <div style={{ fontSize: "11px", color: "#999999" }}>{groupLeads.length} lead{groupLeads.length !== 1 ? "s" : ""}{hotCount > 0 ? ` · ${hotCount} hot` : ""}</div>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {/* Stage mini-counts */}
                              <div style={{ display: "flex", gap: "4px" }}>
                                {STAGES.slice(0, 4).map(s => {
                                  const c = groupLeads.filter(l => l.stage === s).length;
                                  if (!c) return null;
                                  const ss = STAGE_STYLE[s];
                                  return <span key={s} style={{ fontSize: "9px", fontWeight: "700", background: ss.bg, color: ss.text, border: `1px solid ${ss.border}`, padding: "1px 6px", borderRadius: "8px" }}>{s.split(" ")[0]} {c}</span>;
                                })}
                              </div>
                              <span style={{ fontSize: "14px", color: "#AAAAAA", transition: "transform 0.15s", display: "inline-block", transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
                            </div>
                          </div>

                          {/* Group cards */}
                          {expanded && (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "10px", paddingLeft: "4px" }}>
                              {groupLeads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )

                /* ── CARDS VIEW ── */
                : viewMode === "cards" ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "10px" }}>
                    {baseFiltered.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                  </div>
                )

                /* ── LIST VIEW ── */
                : (
                  <div className="card" style={{ overflow: "hidden" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 100px 100px 80px 90px", padding: "8px 14px", background: "#000000", borderBottom: "1px solid #2A2A2A" }}>
                      {["Business", "Industry", "City", "Stage", "Emails"].map((h, i) => (
                        <span key={i} style={{ fontSize: "10px", fontWeight: "700", color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
                      ))}
                    </div>
                    {baseFiltered.map((lead, i) => {
                      const score = hotScore(lead);
                      const sc = STAGE_STYLE[lead.stage];
                      const meta = getIndustryMeta(lead.industry);
                      return (
                        <div key={lead.id} className="row-h" onClick={() => openDetail(lead)} style={{ display: "grid", gridTemplateColumns: "2fr 100px 100px 80px 90px", padding: "10px 14px", borderBottom: i < baseFiltered.length - 1 ? "1px solid #1E2738" : "none", cursor: "pointer", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            {score >= 2 && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#E53E3E", flexShrink: 0 }} />}
                            <span style={{ fontSize: "13px", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.businessName}</span>
                          </div>
                          <span style={{ fontSize: "11px", color: meta.color, fontWeight: "600" }}>{lead.industry}</span>
                          <span style={{ fontSize: "12px", color: "#999999" }}>{lead.city || "—"}</span>
                          <span><span style={{ display: "inline-flex", alignItems: "center", padding: "2px 7px", borderRadius: "10px", fontSize: "9px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em", border: "1px solid", background: sc.bg, color: sc.text, borderColor: sc.border }}>{lead.stage}</span></span>
                          <span style={{ fontSize: "11px", color: (lead.emailsSent || 0) > 0 ? "#48BB78" : "#777777", fontWeight: "600" }}>{lead.emailsSent || 0}/3 sent</span>
                        </div>
                      );
                    })}
                  </div>
                )
              )}
            </div>
          )}

          {/* ══ SCRAPER ══ */}
          {tab === "scraper" && (
            <div className="fi" style={{ maxWidth: "760px" }}>
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "-0.01em", marginBottom: "3px" }}>Business Scraper</div>
                <div style={{ fontSize: "13px", color: "#999999" }}>Find blue-collar businesses by radius using Google Places. Paste your API key in Settings first.</div>
              </div>
              <div className="card" style={{ padding: "20px", marginBottom: "14px" }}>
                <div className="sh">Search Configuration</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div><div className="lbl">Location</div><input value={scrapeConfig.location} onChange={e => setScrapeConfig(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Dallas, TX or 75201" onKeyDown={e => e.key === "Enter" && runScrape()} /></div>
                  <div className="g3">
                    <div><div className="lbl">Radius</div>
                      <select value={scrapeConfig.radius} onChange={e => setScrapeConfig(p => ({ ...p, radius: Number(e.target.value) }))}>
                        {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} mile{r !== 1 ? "s" : ""}</option>)}
                      </select>
                    </div>
                    <div><div className="lbl">Industry</div>
                      <select value={scrapeConfig.industry} onChange={e => setScrapeConfig(p => ({ ...p, industry: e.target.value }))}>
                        {ALL_INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                      </select>
                    </div>
                    <div><div className="lbl">Max Results</div>
                      <select value={scrapeConfig.maxResults} onChange={e => setScrapeConfig(p => ({ ...p, maxResults: e.target.value }))}>
                        {[10, 20, 30, 50].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                  {scrapeError && <div style={{ background: "#200A0A", border: "1px solid #5A1A1A", borderRadius: "6px", padding: "10px 14px", fontSize: "13px", color: "#FC8181" }}>{scrapeError}</div>}
                  {!settings.apiKey && <div style={{ background: "#271D05", border: "1px solid #5A4500", borderRadius: "6px", padding: "10px 14px", fontSize: "12px", color: "#D4A017" }}>⚠ No API key — <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => setTab("settings")}>go to Settings</span> to add your Google Places key.</div>}
                  <button className="btn" onClick={runScrape} disabled={scraping || !scrapeConfig.location} style={{ background: "#FFFFFF", color: "#fff", padding: "10px 24px", fontSize: "13px", alignSelf: "flex-start" }}>
                    {scraping ? <><span className="spin">⟳</span> {scrapeStep === "geocoding" ? "Finding location…" : "Searching businesses…"}</> : "Run Scrape"}
                  </button>
                </div>
              </div>

              {scrapeResults.length > 0 && (
                <div className="card fi" style={{ overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", background: "#000000", borderBottom: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>
                      <input type="checkbox" className="check" checked={scrapeSelected.size === scrapeResults.length} onChange={e => setScrapeSelected(e.target.checked ? new Set(scrapeResults.map(r => r.id)) : new Set())} />
                      Select all ({scrapeSelected.size}/{scrapeResults.length}) · {scrapeConfig.industry} near {scrapeConfig.location}
                    </label>
                    <button className="btn" onClick={importSelected} disabled={scrapeSelected.size === 0} style={{ background: "#FFFFFF", color: "#fff", padding: "7px 14px", fontSize: "12px" }}>
                      Import {scrapeSelected.size} →
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "36px 1fr 130px 70px 80px 110px", padding: "8px 14px", borderBottom: "1px solid #2A2A2A" }}>
                    {["", "Business", "City", "Rating", "Reviews", "Opportunity"].map((h, i) => <span key={i} style={{ fontSize: "10px", fontWeight: "700", color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>)}
                  </div>
                  <div style={{ maxHeight: "380px", overflowY: "auto" }}>
                    {scrapeResults.map(r => {
                      const score = hotScore(r);
                      return (
                        <div key={r.id} className="row-h" style={{ display: "grid", gridTemplateColumns: "36px 1fr 130px 70px 80px 110px", padding: "9px 14px", borderBottom: "1px solid #1E2738", alignItems: "center" }}>
                          <input type="checkbox" className="check" checked={scrapeSelected.has(r.id)} onChange={e => { const s = new Set(scrapeSelected); e.target.checked ? s.add(r.id) : s.delete(r.id); setScrapeSelected(s); }} />
                          <div><div style={{ fontSize: "13px", fontWeight: "500" }}>{r.businessName}</div></div>
                          <span style={{ fontSize: "12px", color: "#999999" }}>{r.city || "—"}</span>
                          <span style={{ fontSize: "12px", color: r.rating ? (r.rating < 4 ? "#FC8181" : "#48BB78") : "#777777", fontWeight: "600" }}>{r.rating ? `★ ${r.rating}` : "—"}</span>
                          <span style={{ fontSize: "12px", color: "#999999" }}>{r.reviewCount || "—"}</span>
                          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                            {[0,1,2].map(i => <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: i < score ? "#E53E3E" : "#2A2A2A" }} />)}
                            <span style={{ fontSize: "10px", color: "#AAAAAA", marginLeft: "3px" }}>{score === 3 ? "Hot" : score === 2 ? "Warm" : "Mild"}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ ADS DASHBOARD ══ */}
          {tab === "ads" && (
            <div className="fi" style={{ display: "flex", gap: "20px", height: "100%", minHeight: "600px" }}>

              {/* Client sidebar */}
              <div style={{ width: "220px", flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#E8EDF5" }}>Clients</div>
                  <button className="btn" onClick={() => setAddingClient(true)} style={{ background: "#FFFFFF", color: "#000000", padding: "4px 10px", fontSize: "11px", fontWeight: "700" }}>+ Add</button>
                </div>

                {adClients.length === 0 && !addingClient && (
                  <div style={{ fontSize: "12px", color: "#AAAAAA", padding: "12px 0" }}>No clients yet. Add one to get started.</div>
                )}

                {adClients.map(client => (
                  <div key={client.id} onClick={() => { setSelectedClient(client); setAdsData(null); setAdsError(""); }} style={{
                    padding: "10px 12px", borderRadius: "7px", cursor: "pointer", marginBottom: "4px",
                    background: selectedClient?.id === client.id ? "#FFFFFF" : "#0D0D0D",
                    border: `1px solid ${selectedClient?.id === client.id ? "#FFFFFF" : "#2A2A2A"}`,
                    transition: "all 0.12s"
                  }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: selectedClient?.id === client.id ? "#000000" : "#E8EDF5", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{client.name}</div>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {(client.platform === "meta" || client.platform === "both") && <span style={{ fontSize: "9px", fontWeight: "700", background: selectedClient?.id === client.id ? "#00000020" : "#1A1A1A", color: selectedClient?.id === client.id ? "#000000" : "#888888", padding: "1px 6px", borderRadius: "3px" }}>Meta</span>}
                      {(client.platform === "google" || client.platform === "both") && <span style={{ fontSize: "9px", fontWeight: "700", background: selectedClient?.id === client.id ? "#00000020" : "#1A1A1A", color: selectedClient?.id === client.id ? "#000000" : "#888888", padding: "1px 6px", borderRadius: "3px" }}>Google</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div style={{ flex: 1, minWidth: 0 }}>

                {/* Add client form */}
                {addingClient && (
                  <div className="card" style={{ padding: "22px", marginBottom: "16px" }}>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: "#E8EDF5", marginBottom: "16px" }}>New Ad Client</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                      <div>
                        <div className="lbl">Client / Business Name</div>
                        <input value={adClientForm.name} onChange={e => setAdClientForm(p => ({ ...p, name: e.target.value }))} placeholder="Joe's Plumbing LLC" />
                      </div>
                      <div>
                        <div className="lbl">Ad Platforms</div>
                        <div style={{ display: "flex", gap: "6px" }}>
                          {[["meta","Meta Only"],["google","Google Only"],["both","Both"]].map(([v, label]) => (
                            <button key={v} className="btn" onClick={() => setAdClientForm(p => ({ ...p, platform: v }))} style={{ padding: "6px 14px", fontSize: "12px", background: adClientForm.platform === v ? "#FFFFFF" : "#111111", color: adClientForm.platform === v ? "#000000" : "#999999", border: `1px solid ${adClientForm.platform === v ? "#FFFFFF" : "#2A2A2A"}`, fontWeight: adClientForm.platform === v ? "700" : "400" }}>{label}</button>
                          ))}
                        </div>
                      </div>

                      {(adClientForm.platform === "meta" || adClientForm.platform === "both") && (
                        <div style={{ background: "#000000", border: "1px solid #1A1A1A", borderRadius: "8px", padding: "14px" }}>
                          <div style={{ fontSize: "11px", fontWeight: "700", color: "#888888", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Meta / Facebook Ads</div>
                          <div className="g2">
                            <div>
                              <div className="lbl">Ad Account ID</div>
                              <input value={adClientForm.metaAdAccountId} onChange={e => setAdClientForm(p => ({ ...p, metaAdAccountId: e.target.value }))} placeholder="123456789" className="mono" />
                              <div style={{ fontSize: "10px", color: "#AAAAAA", marginTop: "4px" }}>Found in Meta Ads Manager → Account Settings</div>
                            </div>
                            <div>
                              <div className="lbl">Access Token</div>
                              <input type="password" value={adClientForm.metaAccessToken} onChange={e => setAdClientForm(p => ({ ...p, metaAccessToken: e.target.value }))} placeholder="EAABs…" className="mono" />
                              <div style={{ fontSize: "10px", color: "#AAAAAA", marginTop: "4px" }}>Generate at developers.facebook.com</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {(adClientForm.platform === "google" || adClientForm.platform === "both") && (
                        <div style={{ background: "#000000", border: "1px solid #1A1A1A", borderRadius: "8px", padding: "14px" }}>
                          <div style={{ fontSize: "11px", fontWeight: "700", color: "#888888", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>Google Ads</div>
                          <div className="g2">
                            <div>
                              <div className="lbl">Customer ID</div>
                              <input value={adClientForm.googleCustomerId} onChange={e => setAdClientForm(p => ({ ...p, googleCustomerId: e.target.value }))} placeholder="123-456-7890" className="mono" />
                              <div style={{ fontSize: "10px", color: "#AAAAAA", marginTop: "4px" }}>Found in Google Ads → top right corner</div>
                            </div>
                            <div>
                              <div className="lbl">Developer Token</div>
                              <input type="password" value={adClientForm.googleDevToken} onChange={e => setAdClientForm(p => ({ ...p, googleDevToken: e.target.value }))} placeholder="dev_token…" className="mono" />
                              <div style={{ fontSize: "10px", color: "#AAAAAA", marginTop: "4px" }}>Found in Google Ads API Center</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {adClientError && <div style={{ background: "#200A0A", border: "1px solid #5A1A1A", borderRadius: "5px", padding: "8px 12px", fontSize: "12px", color: "#FC8181" }}>{adClientError}</div>}

                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="btn" onClick={addAdClient} style={{ background: "#FFFFFF", color: "#000000", padding: "9px 22px", fontSize: "13px", fontWeight: "600" }}>Save Client</button>
                        <button className="btn" onClick={() => { setAddingClient(false); setAdClientError(""); }} style={{ background: "#111111", color: "#999999", padding: "9px 18px", fontSize: "13px", border: "1px solid #222222" }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* No client selected */}
                {!selectedClient && !addingClient && (
                  <div style={{ textAlign: "center", padding: "80px 20px" }}>
                    <div style={{ width: "52px", height: "52px", background: "#111111", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "22px" }}>📊</div>
                    <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px", color: "#E8EDF5" }}>No client selected</div>
                    <div style={{ fontSize: "13px", color: "#AAAAAA", marginBottom: "20px" }}>Add a client and connect their Meta or Google Ads account to view performance.</div>
                    <button className="btn" onClick={() => setAddingClient(true)} style={{ background: "#FFFFFF", color: "#000000", padding: "10px 22px", fontSize: "13px", fontWeight: "600" }}>+ Add First Client</button>
                  </div>
                )}

                {/* Client dashboard */}
                {selectedClient && !addingClient && (() => {
                  const hasMeta = selectedClient.platform === "meta" || selectedClient.platform === "both";
                  const hasGoogle = selectedClient.platform === "google" || selectedClient.platform === "both";
                  const activePlatform = hasMeta && hasGoogle ? adsPlatform : hasMeta ? "meta" : "google";

                  // Aggregate metrics from data
                  const metaRows = adsData || [];
                  const totals = metaRows.reduce((acc, row) => ({
                    spend: acc.spend + parseFloat(row.spend || 0),
                    impressions: acc.impressions + parseInt(row.impressions || 0),
                    clicks: acc.clicks + parseInt(row.clicks || 0),
                    reach: acc.reach + parseInt(row.reach || 0),
                    leads: acc.leads + (row.actions?.find(a => a.action_type === "lead")?.value || 0),
                  }), { spend: 0, impressions: 0, clicks: 0, reach: 0, leads: 0 });
                  const ctr = totals.impressions > 0 ? ((totals.clicks / totals.impressions) * 100).toFixed(2) : "—";
                  const cpc = totals.clicks > 0 ? (totals.spend / totals.clicks).toFixed(2) : "—";
                  const cpl = totals.leads > 0 ? (totals.spend / totals.leads).toFixed(2) : "—";

                  return (
                    <div>
                      {/* Client header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                        <div>
                          <div style={{ fontSize: "20px", fontWeight: "700", color: "#E8EDF5", letterSpacing: "-0.01em", marginBottom: "3px" }}>{selectedClient.name}</div>
                          <div style={{ fontSize: "12px", color: "#AAAAAA" }}>Ad Account Dashboard</div>
                        </div>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          {/* Date range */}
                          <select value={adsDateRange} onChange={e => { setAdsDateRange(e.target.value); setAdsData(null); setAdsError(""); }} style={{ width: "110px", fontSize: "12px", padding: "5px 8px" }}>
                            <option value="last_7d">Last 7 days</option>
                            <option value="last_14d">Last 14 days</option>
                            <option value="last_30d">Last 30 days</option>
                            <option value="last_90d">Last 90 days</option>
                          </select>
                          <button className="btn" onClick={() => loadAds(selectedClient, activePlatform, adsDateRange)} disabled={adsLoading} style={{ background: "#FFFFFF", color: "#000000", padding: "6px 16px", fontSize: "12px", fontWeight: "700" }}>
                            {adsLoading ? <><span className="spin">⟳</span> Loading…</> : "↻ Refresh"}
                          </button>
                          <button className="btn" onClick={() => removeAdClient(selectedClient.id)} style={{ background: "#111111", color: "#AAAAAA", padding: "6px 10px", fontSize: "12px", border: "1px solid #222222" }}>Remove</button>
                        </div>
                      </div>

                      {/* Platform switcher */}
                      {hasMeta && hasGoogle && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "18px" }}>
                          {[["meta","Meta / Facebook"],["google","Google Ads"]].map(([p, label]) => (
                            <button key={p} className="btn" onClick={() => { setAdsPlatform(p); setAdsData(null); setAdsError(""); }} style={{ padding: "7px 18px", fontSize: "12px", fontWeight: adsPlatform === p ? "700" : "400", background: adsPlatform === p ? "#FFFFFF" : "#111111", color: adsPlatform === p ? "#000000" : "#999999", border: `1px solid ${adsPlatform === p ? "#FFFFFF" : "#2A2A2A"}` }}>{label}</button>
                          ))}
                        </div>
                      )}

                      {/* Credentials edit card */}
                      <div className="card" style={{ padding: "16px", marginBottom: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                          <div style={{ fontSize: "11px", fontWeight: "700", color: "#999999", letterSpacing: "0.08em", textTransform: "uppercase" }}>{activePlatform === "meta" ? "Meta Credentials" : "Google Ads Credentials"}</div>
                          <div style={{ fontSize: "10px", color: "#AAAAAA" }}>Stored locally in this session only</div>
                        </div>
                        {activePlatform === "meta" ? (
                          <div className="g2">
                            <div>
                              <div className="lbl">Ad Account ID</div>
                              <input value={selectedClient.metaAdAccountId || ""} onChange={e => updateAdClient(selectedClient.id, { metaAdAccountId: e.target.value })} placeholder="123456789" className="mono" />
                            </div>
                            <div>
                              <div className="lbl">Access Token</div>
                              <input type="password" value={selectedClient.metaAccessToken || ""} onChange={e => updateAdClient(selectedClient.id, { metaAccessToken: e.target.value })} placeholder="EAABs…" className="mono" />
                            </div>
                          </div>
                        ) : (
                          <div className="g2">
                            <div>
                              <div className="lbl">Customer ID</div>
                              <input value={selectedClient.googleCustomerId || ""} onChange={e => updateAdClient(selectedClient.id, { googleCustomerId: e.target.value })} placeholder="123-456-7890" className="mono" />
                            </div>
                            <div>
                              <div className="lbl">Developer Token</div>
                              <input type="password" value={selectedClient.googleDevToken || ""} onChange={e => updateAdClient(selectedClient.id, { googleDevToken: e.target.value })} placeholder="dev_token…" className="mono" />
                            </div>
                          </div>
                        )}
                        <button className="btn" onClick={() => loadAds(selectedClient, activePlatform, adsDateRange)} disabled={adsLoading} style={{ background: "#FFFFFF", color: "#000000", padding: "8px 20px", fontSize: "12px", fontWeight: "700", marginTop: "12px" }}>
                          {adsLoading ? <><span className="spin">⟳</span> Fetching data…</> : "Load Ad Data"}
                        </button>
                      </div>

                      {/* Error states */}
                      {adsError === "meta_missing_creds" && (
                        <div style={{ background: "#200A0A", border: "1px solid #5A1A1A", borderRadius: "8px", padding: "14px 16px", marginBottom: "16px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: "#FC8181", marginBottom: "4px" }}>Missing Meta credentials</div>
                          <div style={{ fontSize: "12px", color: "#C05050" }}>Fill in the Ad Account ID and Access Token above, then hit Load Ad Data.</div>
                        </div>
                      )}
                      {adsError === "google_proxy_needed" && (
                        <div style={{ background: "#111111", border: "1px solid #2A2A2A", borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: "#E8EDF5", marginBottom: "6px" }}>Google Ads requires a backend proxy</div>
                          <div style={{ fontSize: "12px", color: "#999999", lineHeight: "1.7" }}>
                            The Google Ads API doesn't support direct browser calls due to CORS restrictions. To connect Google Ads, you have two options:<br/><br/>
                            <strong style={{ color: "#CCCCCC" }}>Option 1 — Use Google Looker Studio (free):</strong> Connect your account at <span style={{ color: "#AAAAAA" }}>lookerstudio.google.com</span> and embed the report URL below.<br/><br/>
                            <strong style={{ color: "#CCCCCC" }}>Option 2 — Set up a proxy:</strong> Deploy a simple server (Cloudflare Worker, Vercel Function) that forwards Google Ads API calls with your credentials.
                          </div>
                          <div style={{ marginTop: "12px" }}>
                            <div className="lbl">Embed Google Looker Studio Report URL</div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <input value={selectedClient.googleLookerUrl || ""} onChange={e => updateAdClient(selectedClient.id, { googleLookerUrl: e.target.value })} placeholder="https://lookerstudio.google.com/embed/reporting/…" />
                              <button className="btn" onClick={() => { if (selectedClient.googleLookerUrl) setAdsError("show_looker"); }} style={{ background: "#FFFFFF", color: "#000000", padding: "8px 14px", fontSize: "12px", fontWeight: "700", flexShrink: 0 }}>Embed</button>
                            </div>
                          </div>
                        </div>
                      )}
                      {adsError === "show_looker" && selectedClient.googleLookerUrl && (
                        <div style={{ marginBottom: "16px" }}>
                          <div style={{ fontSize: "11px", color: "#AAAAAA", marginBottom: "8px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>Google Looker Studio Report</div>
                          <iframe src={selectedClient.googleLookerUrl} style={{ width: "100%", height: "500px", border: "1px solid #222222", borderRadius: "8px", background: "#111111" }} title="Google Looker Studio" />
                        </div>
                      )}
                      {adsError && !["meta_missing_creds","google_missing_creds","google_proxy_needed","show_looker"].includes(adsError) && (
                        <div style={{ background: "#200A0A", border: "1px solid #5A1A1A", borderRadius: "8px", padding: "14px 16px", marginBottom: "16px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: "#FC8181", marginBottom: "4px" }}>Error loading ads</div>
                          <div style={{ fontSize: "12px", color: "#C05050", fontFamily: "monospace" }}>{adsError}</div>
                        </div>
                      )}

                      {/* Metrics grid */}
                      {adsData && adsData.length > 0 && (
                        <div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px", marginBottom: "20px" }}>
                            {[
                              { label: "Total Spend", value: `$${totals.spend.toFixed(2)}` },
                              { label: "Impressions", value: totals.impressions.toLocaleString() },
                              { label: "Clicks", value: totals.clicks.toLocaleString() },
                              { label: "CTR", value: `${ctr}%` },
                              { label: "Avg CPC", value: cpc !== "—" ? `$${cpc}` : "—" },
                              { label: "Reach", value: totals.reach.toLocaleString() },
                              { label: "Leads", value: totals.leads || "—" },
                              { label: "Cost/Lead", value: cpl !== "—" ? `$${cpl}` : "—" },
                            ].map(({ label, value }) => (
                              <div key={label} className="card" style={{ padding: "14px" }}>
                                <div style={{ fontSize: "10px", fontWeight: "700", color: "#AAAAAA", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
                                <div style={{ fontSize: "20px", fontWeight: "700", color: "#E8EDF5", letterSpacing: "-0.02em" }}>{value}</div>
                              </div>
                            ))}
                          </div>

                          {/* Campaign breakdown table */}
                          <div className="card" style={{ overflow: "hidden" }}>
                            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1A1A1A", fontSize: "11px", fontWeight: "700", color: "#999999", letterSpacing: "0.08em", textTransform: "uppercase" }}>Campaign Breakdown</div>
                            <div style={{ display: "grid", gridTemplateColumns: "2fr 90px 80px 80px 70px 70px", padding: "8px 16px", background: "#000000", borderBottom: "1px solid #1A1A1A" }}>
                              {["Campaign", "Spend", "Impressions", "Clicks", "CTR", "CPC"].map(h => <span key={h} style={{ fontSize: "10px", fontWeight: "700", color: "#AAAAAA", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>)}
                            </div>
                            <div style={{ maxHeight: "340px", overflowY: "auto" }}>
                              {metaRows.map((row, i) => {
                                const rowCtr = row.impressions > 0 ? ((row.clicks / row.impressions) * 100).toFixed(2) : "—";
                                const rowCpc = row.clicks > 0 ? (row.spend / row.clicks).toFixed(2) : "—";
                                return (
                                  <div key={i} className="row-h" style={{ display: "grid", gridTemplateColumns: "2fr 90px 80px 80px 70px 70px", padding: "10px 16px", borderBottom: i < metaRows.length - 1 ? "1px solid #111111" : "none", alignItems: "center" }}>
                                    <span style={{ fontSize: "13px", fontWeight: "500", color: "#E8EDF5", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.campaign_name}</span>
                                    <span style={{ fontSize: "12px", color: "#CCCCCC", fontWeight: "600" }}>${parseFloat(row.spend || 0).toFixed(2)}</span>
                                    <span style={{ fontSize: "12px", color: "#888888" }}>{parseInt(row.impressions || 0).toLocaleString()}</span>
                                    <span style={{ fontSize: "12px", color: "#888888" }}>{parseInt(row.clicks || 0).toLocaleString()}</span>
                                    <span style={{ fontSize: "12px", color: "#888888" }}>{rowCtr}%</span>
                                    <span style={{ fontSize: "12px", color: "#888888" }}>{rowCpc !== "—" ? `$${rowCpc}` : "—"}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Empty state after load with no data */}
                      {adsData && adsData.length === 0 && (
                        <div style={{ textAlign: "center", padding: "40px", background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "8px" }}>
                          <div style={{ fontSize: "14px", color: "#AAAAAA" }}>No campaign data found for this date range.</div>
                        </div>
                      )}

                      {/* Setup guide if no data loaded yet */}
                      {!adsData && !adsError && !adsLoading && (
                        <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "8px", padding: "20px" }}>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: "#E8EDF5", marginBottom: "12px" }}>
                            {activePlatform === "meta" ? "How to connect Meta Ads" : "How to connect Google Ads"}
                          </div>
                          {activePlatform === "meta" ? (
                            <div style={{ fontSize: "12px", color: "#999999", lineHeight: "1.9" }}>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>1.</span> Go to your client's <strong style={{ color: "#CCCCCC" }}>Meta Business Suite</strong> → Settings → Ad Accounts</div>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>2.</span> Copy the <strong style={{ color: "#CCCCCC" }}>Ad Account ID</strong> (numbers only, no "act_")</div>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>3.</span> Go to <strong style={{ color: "#CCCCCC" }}>developers.facebook.com</strong> → Tools → Graph API Explorer</div>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>4.</span> Select your app, generate an <strong style={{ color: "#CCCCCC" }}>Access Token</strong> with <code style={{ background: "#1A1A1A", padding: "1px 5px", borderRadius: "3px", fontSize: "11px" }}>ads_read</code> permission</div>
                              <div><span style={{ color: "#CCCCCC", fontWeight: "600" }}>5.</span> Paste both above and click <strong style={{ color: "#CCCCCC" }}>Load Ad Data</strong></div>
                            </div>
                          ) : (
                            <div style={{ fontSize: "12px", color: "#999999", lineHeight: "1.9" }}>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>1.</span> Go to your client's <strong style={{ color: "#CCCCCC" }}>Google Ads</strong> account (top right for Customer ID)</div>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>2.</span> Go to <strong style={{ color: "#CCCCCC" }}>ads.google.com/home/tools/api-center</strong> for your developer token</div>
                              <div style={{ marginBottom: "6px" }}><span style={{ color: "#CCCCCC", fontWeight: "600" }}>3.</span> Or use <strong style={{ color: "#CCCCCC" }}>Looker Studio</strong> (easiest — free embedding with no proxy needed)</div>
                              <div><span style={{ color: "#CCCCCC", fontWeight: "600" }}>4.</span> Paste your credentials above or embed a Looker Studio URL</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ══ AD GENERATOR ══ */}
          {tab === "adgen" && <AdGenerator leads={leads} settings={settings} PLAYBOOK={PLAYBOOK} fillVars={fillVars} getTemplates={getTemplates} />}

          {/* ══ SETTINGS ══ */}
          {tab === "settings" && (
            <div className="fi" style={{ maxWidth: "560px" }}>
              <div style={{ marginBottom: "22px" }}>
                <div style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "-0.01em", marginBottom: "3px" }}>Settings</div>
                <div style={{ fontSize: "13px", color: "#999999" }}>Configure your API key, sender info, and team</div>
              </div>

              {/* Google Places API */}
              <div className="card" style={{ padding: "20px", marginBottom: "14px" }}>
                <div className="sh">Google Places API</div>
                <div className="lbl">API Key</div>
                <input type="password" value={settings.apiKey} onChange={e => setSettings(p => ({ ...p, apiKey: e.target.value }))} placeholder="AIza…" className="mono" />
                <div style={{ fontSize: "11px", color: "#AAAAAA", marginTop: "6px" }}>Get a free key at console.cloud.google.com → Enable "Places API" + "Geocoding API". Free tier = ~13,000 searches/month.</div>
              </div>

              {/* Sender Info */}
              <div className="card" style={{ padding: "20px", marginBottom: "14px" }}>
                <div className="sh">Sender Info</div>
                <div className="g2">
                  <div><div className="lbl">Your Name</div><input value={settings.senderName} onChange={e => setSettings(p => ({ ...p, senderName: e.target.value }))} placeholder="Alex Johnson" /></div>
                  <div><div className="lbl">Your Email</div><input value={settings.senderEmail} onChange={e => setSettings(p => ({ ...p, senderEmail: e.target.value }))} placeholder="alex@youragency.com" /></div>
                </div>
                <div style={{ fontSize: "12px", color: "#999999", background: "#000000", padding: "10px 14px", borderRadius: "6px", border: "1px solid #222222", marginTop: "12px" }}>
                  Clicking "Send" opens your mail app (Gmail, Outlook, Apple Mail) with the email pre-filled. All 225 playbook templates built in.
                </div>
              </div>

              {/* ── TEAM MEMBERS ── */}
              <div className="card" style={{ padding: "20px", marginBottom: "14px" }}>
                <div className="sh">Team Members ({teamMembers.length})</div>

                {/* Existing members list */}
                <div style={{ marginBottom: "18px" }}>
                  {teamMembers.map((member, i) => (
                    <div key={member.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < teamMembers.length - 1 ? "1px solid #1A1A1A" : "none" }}>
                      {/* Avatar */}
                      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: member.id === "owner" ? "#FFFFFF" : "#1A1A1A", border: "1px solid #2A2A2A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "12px", fontWeight: "700", color: member.id === "owner" ? "#000000" : "#888888" }}>
                          {(member.name || "?").charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#E8EDF5", marginBottom: "1px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#AAAAAA", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {member.email || "No email set"}
                        </div>
                      </div>

                      {/* Role selector */}
                      {member.id !== "owner" ? (
                        <select
                          value={member.role}
                          onChange={e => updateMemberRole(member.id, e.target.value)}
                          style={{ width: "100px", fontSize: "11px", padding: "4px 8px", background: "#111111", border: "1px solid #2A2A2A", color: "#CCCCCC", borderRadius: "5px" }}
                        >
                          <option>Admin</option>
                          <option>Member</option>
                          <option>Viewer</option>
                        </select>
                      ) : (
                        <span style={{ fontSize: "11px", fontWeight: "700", color: "#888888", background: "#1A1A1A", padding: "3px 10px", borderRadius: "20px", border: "1px solid #2A2A2A" }}>Owner</span>
                      )}

                      {/* Status badge */}
                      <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "10px", background: member.status === "active" ? "#0A2018" : "#1A1500", color: member.status === "active" ? "#48BB78" : "#D4A017", border: `1px solid ${member.status === "active" ? "#1A6840" : "#5A4500"}`, whiteSpace: "nowrap" }}>
                        {member.status === "active" ? "Active" : "Invited"}
                      </span>

                      {/* Remove */}
                      {member.id !== "owner" && (
                        <button className="btn" onClick={() => removeMember(member.id)} style={{ background: "transparent", color: "#AAAAAA", padding: "4px 6px", fontSize: "15px", lineHeight: 1, border: "1px solid transparent" }}
                          onMouseEnter={e => { e.currentTarget.style.color = "#FC8181"; e.currentTarget.style.borderColor = "#5A1A1A"; }}
                          onMouseLeave={e => { e.currentTarget.style.color = "#777777"; e.currentTarget.style.borderColor = "transparent"; }}>
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add new member form */}
                <div style={{ background: "#000000", border: "1px solid #1A1A1A", borderRadius: "8px", padding: "16px" }}>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "#999999", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Add Team Member</div>
                  <div className="g2" style={{ marginBottom: "10px" }}>
                    <div>
                      <div className="lbl">Full Name</div>
                      <input value={newMember.name} onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))} placeholder="Jane Smith" onKeyDown={e => e.key === "Enter" && addMember()} />
                    </div>
                    <div>
                      <div className="lbl">Email Address</div>
                      <input value={newMember.email} onChange={e => setNewMember(p => ({ ...p, email: e.target.value }))} placeholder="jane@agency.com" type="email" onKeyDown={e => e.key === "Enter" && addMember()} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <div className="lbl">Role</div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["Admin", "Member", "Viewer"].map(r => (
                        <button key={r} className="btn" onClick={() => setNewMember(p => ({ ...p, role: r }))} style={{ padding: "5px 14px", fontSize: "12px", background: newMember.role === r ? "#FFFFFF" : "#111111", color: newMember.role === r ? "#000000" : "#999999", border: `1px solid ${newMember.role === r ? "#FFFFFF" : "#2A2A2A"}`, fontWeight: newMember.role === r ? "700" : "400" }}>
                          {r}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize: "11px", color: "#AAAAAA", marginTop: "6px" }}>
                      {newMember.role === "Admin" ? "Can manage leads, scrape, send emails, and edit settings." : newMember.role === "Member" ? "Can manage leads, scrape, and send emails." : "Can view leads and pipeline only."}
                    </div>
                  </div>

                  {memberError && (
                    <div style={{ background: "#200A0A", border: "1px solid #5A1A1A", borderRadius: "5px", padding: "8px 12px", fontSize: "12px", color: "#FC8181", marginBottom: "10px" }}>
                      {memberError}
                    </div>
                  )}

                  {memberAdded && (
                    <div style={{ background: "#0A2018", border: "1px solid #1A6840", borderRadius: "5px", padding: "8px 12px", fontSize: "12px", color: "#48BB78", marginBottom: "10px" }}>
                      ✓ Member added successfully.
                    </div>
                  )}

                  <button className="btn" onClick={addMember} style={{ background: "#FFFFFF", color: "#000000", padding: "9px 20px", fontSize: "13px", fontWeight: "600", width: "100%", justifyContent: "center" }}>
                    + Add Member
                  </button>
                </div>
              </div>

              {/* Email Log */}
              <div className="card" style={{ padding: "20px" }}>
                <div className="sh">Email Log ({emailLog.length} sent)</div>
                {emailLog.length === 0 ? <div style={{ fontSize: "13px", color: "#AAAAAA" }}>No emails sent yet.</div> : (
                  <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {emailLog.map(log => (
                      <div key={log.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #1A1A1A", fontSize: "12px", alignItems: "center" }}>
                        <span style={{ fontWeight: "500" }}>{log.leadName}</span>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <span style={{ fontSize: "10px", background: "#0A2018", color: "#48BB78", padding: "2px 8px", borderRadius: "10px", fontWeight: "600" }}>Email {log.emailNum} · {log.set}</span>
                          <span style={{ color: "#AAAAAA" }}>{daysAgo(log.time)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ DETAIL DRAWER ══ */}
      {detailOpen && selectedLead && (() => {
        const lead = selectedLead;
        const templates = getTemplates(lead.industry);
        const currentSet = previewEmail?.set || chooseSet(lead);
        const currentEmailIdx = previewEmail?.emailIndex ?? 0;
        const template = templates[currentSet]?.[currentEmailIdx];
        const meta = getIndustryMeta(lead.industry);
        const sc = STAGE_STYLE[lead.stage];
        const daysSinceContact = lead.lastContacted ? Math.floor((Date.now() - new Date(lead.lastContacted)) / 86400000) : null;

        return (
          <>
            <div onClick={() => setDetailOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, backdropFilter: "blur(3px)" }} />
            <div className="fi" style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "450px", maxWidth: "100vw", background: "#0D0D0D", borderLeft: "1px solid #2A2A2A", zIndex: 201, overflowY: "auto", padding: "20px" }}>

              {/* Header with industry color accent */}
              <div style={{ background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: "8px", padding: "14px 16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#E8EDF5", letterSpacing: "-0.01em" }}>{lead.businessName}</div>
                      <div style={{ fontSize: "11px", color: meta.color, fontWeight: "600" }}>{lead.industry}{lead.city ? ` · ${lead.city}` : ""}{lead.rating ? ` · ★ ${lead.rating} (${lead.reviewCount})` : ""}</div>
                    </div>
                  </div>
                  <button className="btn" onClick={() => setDetailOpen(false)} style={{ background: "rgba(255,255,255,0.07)", color: "#8A97AB", padding: "5px 9px", fontSize: "16px", lineHeight: 1 }}>×</button>
                </div>
              </div>

              {/* Stage */}
              <div style={{ marginBottom: "14px" }}>
                <div className="lbl">Stage</div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {STAGES.map(s => { const a = lead.stage === s; const ss = STAGE_STYLE[s]; return (
                    <button key={s} className="btn" onClick={() => updateLead(lead.id, { stage: s })} style={{ padding: "4px 10px", fontSize: "11px", background: a ? ss.bg : "#000000", color: a ? ss.text : "#999999", border: `1px solid ${a ? ss.border : "#2A2A2A"}`, fontWeight: a ? "600" : "400" }}>{s}</button>
                  ); })}
                </div>
              </div>

              {/* Email composer */}
              <div className="card" style={{ padding: "14px", marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#999999", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email Outreach</div>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {["set1","set2","set3"].map(s => (
                      <button key={s} className={`set-btn ${currentSet === s ? "active" : ""}`} onClick={() => setPreviewEmail({ emailIndex: currentEmailIdx, set: s })}>
                        {s === "set1" ? "Direct" : s === "set2" ? "Classic" : "Data"}
                      </button>
                    ))}
                  </div>
                </div>

                {currentSet === "set3" && (!lead.rating || lead.reviewCount < 5) && (
                  <div style={{ background: "#271D05", border: "1px solid #5A4500", borderRadius: "5px", padding: "7px 10px", fontSize: "11px", color: "#D4A017", marginBottom: "8px" }}>
                    ⚠ Set 3 needs 5+ reviews. Switch to Set 1 or 2, or add rating data in contact details.
                  </div>
                )}

                {/* Email day tabs */}
                <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
                  {templates[currentSet]?.map((tmpl, i) => {
                    const isSent = (lead.emailsSent || 0) > i;
                    const isNext = (lead.emailsSent || 0) === i;
                    const daysLeft = daysSinceContact !== null ? tmpl.day - daysSinceContact : null;
                    const isDue = daysLeft !== null && daysLeft <= 0;
                    return (
                      <button key={i} onClick={() => setPreviewEmail({ emailIndex: i, set: currentSet })} style={{
                        flex: 1, cursor: "pointer", border: `1px solid ${currentEmailIdx === i ? "#FFFFFF" : isSent ? "#1A6840" : "#2A2A2A"}`,
                        borderRadius: "6px", padding: "6px 4px", textAlign: "center", fontSize: "10px", fontWeight: "700", transition: "all 0.13s",
                        background: currentEmailIdx === i ? "#1A1A1A" : isSent ? "#0A2018" : isDue && isNext ? "#271D05" : "#000000",
                        color: currentEmailIdx === i ? "#FFFFFF" : isSent ? "#48BB78" : "#8A97AB",
                      }}>
                        <div>Day {tmpl.day}</div>
                        <div style={{ fontSize: "9px", opacity: 0.75 }}>{isSent ? "✓ Sent" : isNext && isDue ? "Due" : isNext ? "Next" : "Later"}</div>
                      </button>
                    );
                  })}
                </div>

                {template && (
                  <>
                    <div style={{ marginBottom: "7px" }}>
                      <div className="lbl">Subject</div>
                      <div style={{ fontSize: "12px", fontWeight: "500", background: "#000000", padding: "7px 9px", borderRadius: "5px", border: "1px solid #2A2A2A", color: "#E8EDF5" }}>{fillVars(template.subject, lead, settings.senderName)}</div>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <div className="lbl">Body</div>
                      <div style={{ background: "#000000", border: "1px solid #2A2A2A", borderRadius: "6px", padding: "10px", fontSize: "12px", color: "#8A97AB", lineHeight: "1.7", whiteSpace: "pre-wrap", maxHeight: "180px", overflowY: "auto" }}>
                        {fillVars(template.body, lead, settings.senderName)}
                      </div>
                    </div>
                    {!lead.email && (
                      <div style={{ marginBottom: "8px" }}>
                        <div className="lbl" style={{ color: "#FC8181" }}>⚠ No email on file</div>
                        <input value={lead.email || ""} onChange={e => updateLead(lead.id, { email: e.target.value })} placeholder="owner@business.com" />
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "7px" }}>
                      <button className="btn" onClick={() => sendEmail(lead, currentEmailIdx, currentSet)} style={{ flex: 1, background: "#FFFFFF", color: "#fff", padding: "8px 14px", fontSize: "12px", justifyContent: "center" }}>✉ Open in Mail App</button>
                      <button className="btn" onClick={() => copyEmailText(lead, currentEmailIdx, currentSet)} style={{ background: "#141414", color: "#8A97AB", padding: "8px 12px", fontSize: "12px", border: "1px solid #2A2A2A" }}>
                        {copiedMsg === `${lead.id}-${currentEmailIdx}-${currentSet}` ? "✓" : "Copy"}
                      </button>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#AAAAAA", marginBottom: "3px" }}>
                        <span>Cadence progress</span><span>{lead.emailsSent || 0}/3</span>
                      </div>
                      <div className="prog"><div className="prog-fill" style={{ width: `${((lead.emailsSent || 0) / 3) * 100}%` }} /></div>
                    </div>
                  </>
                )}
              </div>

              {/* Contact details */}
              <div className="card" style={{ padding: "14px", marginBottom: "10px" }}>
                <div className="sh">Contact Details</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                  {[
                    { key: "contactName", label: "Contact Name", placeholder: "Joe Smith" },
                    { key: "phone", label: "Phone", placeholder: "(555) 000-0000" },
                    { key: "email", label: "Email", placeholder: "joe@business.com" },
                    { key: "website", label: "Website", placeholder: "joesplumbing.com" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} style={{ display: "grid", gridTemplateColumns: "85px 1fr", gap: "8px", alignItems: "center" }}>
                      <div className="lbl" style={{ marginBottom: 0 }}>{label}</div>
                      <input value={lead[key] || ""} onChange={e => updateLead(lead.id, { [key]: e.target.value })} placeholder={placeholder} />
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "85px 1fr", gap: "8px", alignItems: "center" }}>
                    <div className="lbl" style={{ marginBottom: 0 }}>Email Set</div>
                    <select value={lead.emailSet || "set2"} onChange={e => updateLead(lead.id, { emailSet: e.target.value })}>
                      <option value="set1">Set 1 — Direct</option>
                      <option value="set2">Set 2 — Classic</option>
                      <option value="set3">Set 3 — Data-Driven</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Gaps */}
              <div className="card" style={{ padding: "14px", marginBottom: "10px" }}>
                <div className="sh">Opportunity Gaps</div>
                {[
                  { key: "hasGoogleProfile", label: "Google Business Profile" },
                  { key: "hasWebsite", label: "Working Website" },
                  { key: "runningAds", label: "Running Paid Ads" },
                ].map(({ key, label }) => {
                  const has = lead[key];
                  return (
                    <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1E2738" }}>
                      <span style={{ fontSize: "12px", color: "#8A97AB" }}>{label}</span>
                      <button className="btn" onClick={() => updateLead(lead.id, { [key]: !has })} style={{ padding: "2px 9px", fontSize: "10px", fontWeight: "600", background: has ? "#0A2018" : "#200A0A", color: has ? "#48BB78" : "#FC8181", border: `1px solid ${has ? "#1A6840" : "#5A1A1A"}` }}>
                        {has ? "Yes" : "No — Gap"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Notes */}
              <div className="card" style={{ padding: "14px", marginBottom: "10px" }}>
                <div className="sh">Notes</div>
                <textarea value={lead.notes || ""} onChange={e => updateLead(lead.id, { notes: e.target.value })} rows={3} placeholder="Notes about this lead…" />
              </div>

              <button className="btn" onClick={() => deleteLead(lead.id)} style={{ background: "#200A0A", color: "#FC8181", border: "1px solid #5A1A1A", padding: "8px 14px", fontSize: "12px", width: "100%", justifyContent: "center" }}>
                Delete Lead
              </button>
            </div>
          </>
        );
      })()}
    </div>
  );
}
