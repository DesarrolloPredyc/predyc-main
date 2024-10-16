import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { EnumChangefreq, SitemapItem, SitemapStream } from 'sitemap';
import { createGzip } from 'zlib';
import { environment } from './src/environments/environment';
import { Request, Response } from "express";
import { routes } from "./src/app/app.routes"

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });

  function formatTimestamp(
    timestamp: { _seconds: number; _nanoseconds: number } | null
  ): string {
    const date = new Date(timestamp._seconds * 1000);
    return date.toISOString()
  };

  async function sitemap(req: Request, res: Response) {
    res.header("Content-Type", "application/xml");
    res.header("Content-Encoding", "gzip");

    try {

      const responses = await Promise.all(
        [
          fetch(environment.cloudFunc + '/getPredictivaArticlesSlug'), 
          // fetch(environment.cloudFunc + '/getAllCourseIds'), 
          // fetch(environment.cloudFunc + '/getAllFreebiesIds')
        ]
      )
      const responsesJson = await Promise.all(responses.map(response => response.json()))

      const sitemapStream = new SitemapStream({
        hostname: environment.hostUrl,
      });
      const pipeline = sitemapStream.pipe(createGzip());

      routes.forEach(route => {
        if (route.path === "**"){
          return
        }
        if (route.path === "articulos") {

          sitemapStream.write({
            changefreq: EnumChangefreq.MONTHLY,
            priority: 1,
            url: `${environment.hostUrl}/${route.path}`,
          } as SitemapItem)

          // Fetch blog posts from Firestore
          const blogPostsSnapshot = responsesJson[0]

          blogPostsSnapshot.forEach(blogPost => {
            if (!blogPost.isDraft) {
              sitemapStream.write({
                changefreq: EnumChangefreq.MONTHLY,
                lastmod: formatTimestamp(blogPost.updatedAt),
                // priority: 0.7,
                url: `${environment.hostUrl}/articulos/${blogPost.slug}`,
              });
            }
          });

        } 
        // else if (route.path === "cursos/:id") {

        //   // Fetch courses id from Firestore
        //   const coursesSnapshot = responsesJson[1]

        //   coursesSnapshot.forEach(course => {
        //     if (!course.proximamente) {
        //       sitemapStream.write({
        //         changefreq: EnumChangefreq.MONTHLY,
        //         lastmod: formatTimestamp(course.updatedAt),
        //         // priority: 0.7,
        //         url: `${environment.hostUrl}/cursos/${course.customUrl}`,
        //       });
        //     }
        //   });

        // }
        // else if (route.path === "recursos/:custom-url") {

        //   // Fetch freebie from Firestore
        //   const freebiesSnapshot = responsesJson[2]

        //   freebiesSnapshot.forEach(freebie => {

        //     sitemapStream.write({
        //       changefreq: EnumChangefreq.MONTHLY,
        //       lastmod: formatTimestamp(freebie.updatedAt),
        //       // priority: 0.7,
        //       url: `${environment.hostUrl}/recursos/${freebie.id}`,
        //     });
        //   });

        // }
        // else if (route.path === "programas/:id") {
        //   // Do nothing
        // }
        // else if (route.path === "**") {
        //   // Do nothing
        // }
        else {
          sitemapStream.write({
            changefreq: EnumChangefreq.MONTHLY,
            priority: 1,
            url: `${environment.hostUrl}/${route.path}`,
          } as SitemapItem)
        }
      })
      // Stream write the response
      sitemapStream.end();
      pipeline.pipe(res).on("error", (error: Error) => {
        throw error;
      });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  }

  server.get('/sitemap.xml', sitemap);

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));


  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4201;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    //console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

if (process.env['LOCAL']) {
  run();
}

if (!environment.production) {
  run();
} 