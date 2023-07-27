type MDXDocument = {
  _id: string,
  type: 'local' | 'remote',
  title: string,
  description: string?,
  date: string?,
  body: string?,
  slugAsParams: string,
}