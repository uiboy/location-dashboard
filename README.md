# Location Dashboard

The Adyen location dashboard - lets Jamie pick which location she would like to work next from. The
dashboard provides a list of cities that can be clicked on which further expands
with an overview of the temperature forecast and flight expenses for that location.

The forecast data is being populated from a real API, (AccuWeather Forecast API) while 
the flight expense data is mocked in the view layer.

The project overview explains the technical architecure of the project. It in intentionally
 production like. For other choices, improvements and key considerations
see the Key Considerations section.
 

## Table of contents

- [Requirements](#requirements)
- [Project overview](#project-overview)
- [Get started](#project-setup)
- [Key considerations](#key-considerations)

## Requirements
 - [NodeJS](https://nodejs.org/en/)

## Project overview
The project is a VueJS(2.6) application built with the latest vue-cli (4.4). More about VueJS at https://vuejs.org/

It uses class style [Vue components](https://class-component.vuejs.org/) and [property decorators](https://github.com/kaorun343/vue-property-decorator) from 
to allow for declarative and readable Vue
single file components. 

Here are some important architectural aspects of the project covered below:

#### 1. Types
The project uses Typescript for strongly typed classes and methods. Services are written
as Typescript classes that can be injected into individual Vue components using Inversify.

#### 2. Dependency Injection
[Inversify](http://inversify.io/) is an inversion of control (IoC) container for TypeScript that
uses a class constructor to identify and inject its dependencies allowing us to write code adhering 
to SOLID principles. Services are registered in the `InversifyContainer.ts` file as singletons 
and can then be injected into other services/components.

#### 3. Models
All models inherit from a generic `DataModel` and have factories that implement the 
abstract `IModelFactory` class to make new instances.

#### 4. Services
Services like EnvironmentService and HttpService have been set up as building blocks
HttpService is an abstraction layer over axios. We could easily replace axios
with a different http library. 


## Get started
Create a `.env` file (already present for this assignment) at the base of the project with properties from the `sample.env` file. This
can be used for configuring development, testing and production environments.

Install dependencies required for the project
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Key considerations
The focus was on setting up a robust technical architecture that can scale while delivering
the key feature - an overview of weather/flights for Jamie to decide her next location.

1. The dashboard lets Jamie explore each city in detail by clicking and expanding more data about 
a city rather than present a lot of data at once. We could explore adding
some key aggregate data points in the collapsed view. For.eg We could add 
average sunshine hours in the next 6 months for each city in their respective panes, or more 
information about cost of living, etc. based on which Jamie can click a city and dig deeper.

2. The free forecast API provides data only for the next 5 days. So that is used currently. Technically we could show more days or aggregates over months depending
on how long Jamie plans to stay in the next location.

3. While the page is minimally responsive, with more time I would have made more
changes like adding a downward arrow on mobile to let users know the cities
are tappable. The layout on mobile can also be improved like the flights info section.

4. Currently, of course there is no "Action" button on  the page. i.e Jamie cant really
select a city and go somewhere. But thats intentionally left out to keep the scope 
minimal for the given time frame.

5. Improvement: Would have loved to add some Sunnny/Cloudy icons next to the temperature.

Technical Improvements

1. The page is just one single component currently. I would ideally like to split
this up and use a reusable component for each city.
2. Unit tests are currently missing. Left out due to time constraints.
3. Cities data is mocked in the view at the moment, this would ideally also be
delivered by a service/API.


