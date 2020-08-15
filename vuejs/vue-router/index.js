class VueRouter {
  constructor(options) {
    this.routes = options.routes || []
    this.routeMap = this.createMap(this.routes)
    this.current = { path: null }
    this.initListener()
  }

  createMap(routes) {
    return routes.reduce((prev, current) => {
      prev[current.path] = current.component
      return prev
    }, {})
  }

  initListener() {
    window.addEventListener("load", () => {
      this.current.path = location.hash.slice(1)
    })
    window.addEventListener("hashchange", () => {
      this.current.path = location.hash.slice(1)
    })
  }
}

VueRouter.install = function(vue) {
  vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        this.__routerRoot = this
        this.__router = this.$options.router
        vue.util.defineReactive(this, '__route', this.__router.current)
      } else {
        this.__routerRoot = this.$parent && this.$parent.__routerRoot
      }
    }
  })
}
