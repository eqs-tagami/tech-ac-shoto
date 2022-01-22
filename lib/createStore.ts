import { Store, combineReducers } from 'redux'
import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'

import { counterSlice, initialState as counterState } from '@lib/slice/counter'

/**
 * アプリが複雑になってくると、リデューシング関数を別々の関数に分割して、
 * それぞれが独立した部分の状態を管理することが必要になってきます。
 * 
 * combineReducersヘルパー関数は、異なる還元関数の値を持つオブジェクトを、createStoreに渡せる単一の還元関数に変換します。
 * 還元関数はすべての子還元関数を呼び出し、その結果を1つのステートオブジェクトにまとめます。
 * combineReducers()が生成するステートは、compineReducers()に渡されたキーの下に、各リデューサのステートを名前空間化している。
 * 
 * https://redux.js.org/api/combinereducers
 */
const reducer = combineReducers({
  counter: counterSlice.reducer,
})

const preloadedState = () => ({
  counter: counterState,
})

export type StoreState = ReturnType<typeof preloadedState>;
export type ReduxStore = Store<StoreState>;

/**
 * 標準的なReduxのcreateStore関数をフレンドリーに抽象化したもので、
 * ストアの設定に優れたデフォルトを追加し、より良い開発環境を提供します。
 * 
 * https://redux-toolkit.js.org/api/configureStore
 */
const createStore = configureStore({
  /**
   * ルート・リデューサとして使用される単一のリデューサ関数、
   * または comineReducers()`に渡されるスライスリデューサのオブジェクトです。
   */
  reducer,

  /**
   * インストールするReduxミドルウェアの配列です。省略した場合のデフォルトは、
   * `getDefaultMiddleware()`で返されるミドルウェアのセットです。
   */
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
        ],
      },
    }),

  /**
   * Redux DevToolsの統合を有効にするかどうか。デフォルトは `true` です。
   * Redux DevToolsのオプションを渡すことで、追加の設定を行うことができます。
   */
  // devTools: false,

  /**
   * ReduxのcreateStoreと同じ、初期状態です。
   * 
   * ユニバーサルアプリでサーバーから状態をハイドレートしたり、
   * 以前にシリアライズされた状態を復元するために、オプションで指定することができます。
   * 
   * また、`combineReducers()`を使ってルートのreducer関数を生成する場合
   * （直接、または`reducer`としてオブジェクトを渡すことで間接的に）、
   * これはreducerマップのキーと同じ形状のオブジェクトでなければならない。
   */
  // preloadedState: preloadedState(),

  /**
   * 適用するストアエンハンサーです。Reduxの`createStore()`を参照してください。
   * すべてのエンハンサーは、DevTools Extensionエンハンサーの前に含まれます。
   * 
   * エンハンサーの順序をカスタマイズする必要がある場合は、
   * 元の配列を受け取るコールバック 関数を用意してください。
   * この関数は元の配列を受け取り（つまり、`[applyMiddleware]`）、
   * 新しい配列を返す必要があります（例えば、`[applyMiddleware]`）。
   * 新しい配列を返すコールバック関数を用意してください（`[applyMiddleware, offline]`など）。
   * 
   * ミドルウェアを追加するだけであれば、代わりに `middleware` パラメータを使用できます。
   */
  //  enhancers?: StoreEnhancer[] | ConfigureEnhancersCallback,
})
export default createStore;
