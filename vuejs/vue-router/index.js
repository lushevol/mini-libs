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
        this._routerRoot = this
        this._router = this.$options.router
        vue.util.defineReactive(this, '_route', this._router.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }

      Object.defineProperty(this, '$router', {
        get() {
          return this._routerRoot._router
        }
      })

      Object.defineProperty(this, '$route', {
        get() {
          return this._routerRoot._route
        }
      })
    }
  })
}

exprt default VueRouter
