---
title: "ukgasapi"
date: 2015-10-18
excerpt: "An R package on CRAN that loads National Grid gas market data and Elexon electricity demand data into R."
language: R
link: https://cran.r-project.org/web/packages/ukgasapi/index.html
---

ukgasapi is an R package that Tim wrote and maintains on CRAN. It lets analysts load UK energy market data straight into R, instead of downloading it by hand or calling the web services themselves. The main function, `dataItemExplorer()`, queries National Grid's Market Information Provision Initiative (MIPI) API. That is the service behind the Data Item Explorer, which holds thousands of data items, such as gas storage injection and withdrawal volumes. A second function, `bmrsIndoItsdo()`, retrieves electricity demand outturn data from Elexon's BMRS API.

MIPI is a SOAP web service. The package builds the XML request from the data items and dates you ask for, then flattens the response into a data frame, ready for ggplot2. The API limits the size of a query, so long date ranges are split into batches and the results are bound back together. The BMRS function batches its requests in the same way and converts times to Europe/London.

The first release was in October 2015. Version 0.18, in 2020, broadened the package from gas to UK energy market data, moved its HTTP layer to httr and added the BMRS function. The current release, 0.21, has been downloaded about 80,000 times from the RStudio CRAN mirror. It is released under the GPL-2 licence.

<p class="actions">
  <a href="https://cran.r-project.org/web/packages/ukgasapi/index.html" class="button" rel="noopener">View on CRAN</a>
  <a href="https://github.com/timothywong731/ukgasapi" class="button button--quiet" rel="noopener">{% include icon.html name="github" %}<span>Source on GitHub</span></a>
</p>
