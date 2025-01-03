# Decibel Threshold Event Displayer

## Description

The goal (what) of this project is to deliver a FLOSS-licensed, platform-independent piece of software (computer program), called the Decibel Threshold Event Displayer, that

1. takes as inputs a WAV-file and a list of sound level thresholds in decibels (e.g., legal day and night time noise maxima above which your health deteriorates);
2. filters out all data points in the file that correspond to sound events below the lowest of the above thresholds; and
3. displays the remaining data points (as a blue vertical comb plot) on a horizontal time axis (with the dates and times corresponding to the data points) as well as the thresholds (as horizontal red lines) in decibel, and statistically summarises the data set with the help of the LaTeX-package pgfplots.

The **purpose (why)** of this project is to empower poor folks who suffer from insomnia due to ambient noise (https://laermliga.ch) by arming them with the (peaceful) means of proving their noise hell (a smart phone app such as https://apps.apple.com/ch/app/decibel-x-pro-dba-noise-meter/id1257651611 together with your software) to the police and the courts of law.

The code should be minimal, modular, and self-explaining.

The project report should be concise (maximally informative, minimally long). It must contain this project description as a quotation.

## Technologies

Java, LaTeX, https://ctan.org/pkg/pgfplots, https://en.wikipedia.org/wiki/WAV

## Related Projects

https://ctan.org/pkg/luahttp

https://ctan.org/pkg/javascripthttp

https://ctan.org/pkg/latex-dependency-grapher

https://ctan.org/pkg/latexscreenshooter

## Advisor

Dr. Simon KRAMER (https://www.simon-kramer.ch/Simon-Kramer.vcf)