This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




Development Decisions
Using AgGrid for the table
 - I chose this as it has a lot of really great features like virtual scrolling, pagination, filtering. I also like the UI and the ability to customize the columns. It takes alot of the heavy lifting off of me and is easily integrated into the project. I also was able to create this as a reusable component that expects data and styles as props. 

Using SWR for the data fetching
- Being fairly new top react a quick google search led me to SWR. I chose this as it is a really great library for data fetching. It has a lot of really great features like caching, revalidation, and stale-while-revalidate. It also has very simple and readable code that is easy to understand and modify.

Typescript
- I love typescript. It is a statically typed language that is easy to understand and modify. By using types such as the PriceData type, I can easily see what data is being passed around and what data is expected. This helps me catch errors and bugs early on in the development process.

Using Chart.js for the charts
- This isn't something I have massively used before but it seemed quite simple to set up and when comparing it to something like d3.js it just seemed more easy to understand and developmentally friendly. It's a really great library for creating charts. It has a lot of really great features like customizing the charts, adding legends, and adding tooltips.



Trade-offs
React V Angular
- A big trade-off was deciding to do this in react over angular. Im much more familiar with angyular but wanted to try react and for a smaller projct like this the lightweight nature of react and its flexibility was great. Im sure there are better architectral approaches and other things that could be done better but I think this is a good start.

Debouncing
-  I implemented debouncing for search functionality to minimize redundant API calls. There were a few different approaches top this but i chose to use a simple setTimeout function. I didnt have to install any dependencies and it was easy to implement.



Performance & Optimisation
Pagination
- I implemented client side pagination for the table. The data wasnt massive so it seemed a bit overkill to do server side pagination. I chose to use the default pagination that ag-grid provides. I think this is a good start and I can easily add more features to it later. I also added a full screen toggle to make the table full screen just adding to the user experience and making it more useful on a variety of devices.

useMemo
- Being somewhat of a novice in React I'd never heard of useMemo before. Again a quick google and read of the docs showed me how to use it and the benefits. I used useMemo to optimize the performance of the dataTable. 





