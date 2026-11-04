---
title: Read Menu Text, Keep Meal Notes Separate
date: 2026-11-04
excerpt: Recognize printed menu text for search, and record what you actually ate separately with details you confirm yourself.
status: approved
---

Menus show dish names, prices, and nutrition information. Saving a menu can help you find it again, but the menu alone cannot tell you what or how much you actually ate.

ZupZup’s Text Recognition (OCR) reads text printed in an image. In this example, it did not identify a dish from a food photo or calculate calories consumed.

## Recognize text in a menu image

This example uses a menu image for “누룽지장각삼계탕.” In the “Menu OCR Test” item, Text Recognition was started manually from the detail screen. The result showed the dish name and other text printed on the menu.

![Menu text recognition results on a ZupZup detail screen](/images/zupzup-meal-ocr/ocr-detail.png)

* The Korean label “이미지에서 인식 · 2026. 11. 1.” means “Image recognized · Nov 1, 2026.” It is the date OCR ran, not the date of a meal. The 1,208 kcal value is nutrition information printed on the menu, not an estimate of what was eaten.

Check the recognized text against the original image, especially when a number or menu detail matters.

## Find it with a tag and search

After the “식사기록” tag was added manually to the same item, searching for “삼계탕” returned one result with the recognized menu text and tag.

![Search result for “삼계탕” showing the “식사기록” tag](/images/zupzup-meal-ocr/search-tag.png)

* The Korean labels “삼계탕” (samgyetang) and “식사기록” (meal log) are shown as entered. The tag was added manually; this screen does not show automatic tag suggestions or automatic tagging. “Menu OCR Test” is a test item, not a record of a meal.

## Keep actual meal notes separate

If you want to keep a meal record, enter the date and details you have confirmed yourself. For example:

> Hypothetical entry format: YYYY-MM-DD · lunch · samgyetang · enter the amount only if you have confirmed it

This is only a template, not a record of a meal eaten on a particular date. If you do not know the date or amount, leave it out rather than guessing. The date shown by OCR is when text recognition ran; the menu’s calorie figure is menu information.

These screens were checked in ZupZup 1.14 (171) on an iPhone 18 Pro running the iOS 27.2 Simulator. For a general introduction to saving and organizing items, see [Save things with ZupZup and find them again](https://blog.52proj.com/en/zupzup/zupzup-first-save/). Learn more on the [ZupZup App Store page](https://apps.apple.com/app/id6758145905).
