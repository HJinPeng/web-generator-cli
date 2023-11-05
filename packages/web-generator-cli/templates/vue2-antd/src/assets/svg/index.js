// https://webpack.docschina.org/guides/dependency-management/#require-context

function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('./', true, /\.svg$/))
