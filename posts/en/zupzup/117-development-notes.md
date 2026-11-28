---
title: "ZupZup 1.17 dev notes: from saving to organizing"
date: "2026-11-28"
excerpt: "A more consistent way to organize web articles, screenshots, and PDFs, and a clearer name for the existing daily allowance: ZupChips."
status: approved
---

For ZupZup 1.17, I’ve been bringing features I built one at a time into a more consistent flow. Web articles, screenshots, and PDFs all get their text in different ways. But the order should feel the same when you use the app: **first the content is ready, then ZupZup suggests how to organize it**.

## Choose which text to keep from a screenshot

Text recognition can pick up the time at the top of a screenshot or the label on a button along with the text you wanted. I tried filtering out status bar text automatically, but that missed things when the screen layout changed. In 1.17, ZupZup shows the detected lines as boxes over the image so you can choose what to keep.

Every line starts selected. Tap a line to leave it out, then confirm in the upper-right corner. If there are multiple images, swipe sideways to review them. Confirming with no lines selected leaves the recognized text empty. If you leave the app while reviewing, you can pick up where you left off when you reopen the same item.

[Reviewing recognized text and getting an organization suggestion in ZupZup 1.17](/media/zupzup-guides/image/zupzup-117-ocr-review-demo.mp4)

This is real iPad footage with the app set to Korean. The blue boxes mark the lines that will be kept. The button in the upper-right corner confirms the selection; the next shot shows the organization suggestion card. Parts of the example content are obscured.

## Suggestions wait until the content is ready

With automatic organization turned on, ZupZup waits until you confirm the text in a screenshot or until it has fetched the body of a web article. A PDF can also get suggestions once readable text is available. You can turn automatic organization off, run it manually, or ask for another suggestion after adding your own note. Organization suggestions require Apple Intelligence to be available.

## The existing daily allowance has a name: ZupChips

I used to call this simply a usage allowance: the number of times you can use convenience features such as automatic processing or organization suggestions. That same allowance now has a name, **ZupChips**. Settings shows how many you have left and which features use them.

Saving an item doesn’t use any ZupChips. Free users get 20 per device each day, replenished at midnight. The lifetime pass removes that daily limit.

Once 1.17 is wrapped up, I plan to improve ZupZup’s AI features in 1.18 so you can do more with the things you’ve saved.
