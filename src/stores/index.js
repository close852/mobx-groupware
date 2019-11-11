/* store/index.js */
import ArticleStore from './ArticleStore'
import AppStore from './AppStore'
import LeftMenuStore from './LeftMenuStore'

export default {
  ArticleStore: new ArticleStore(),
  LeftMenuStore: new LeftMenuStore(),
  AppStore: new AppStore()
}
