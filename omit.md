# 这节，我们来自己实现一下 ts omit 帮助类型

> 3.5 版本之后，TypeScript 在 lib.es5.d.ts 里添加了一个 ​Omit<T, K>​ 帮助类型。​Omit<T, K>​ 类型让我们可以从
> 另一个对象类型中剔除某些属性，并创建一个新的对象类型

```ts
type User = {
  id: string
  name: string
  email: string
}
type UserWithoutEmail = Omit<User, 'email'>

// 等价于

type UserWithoutEmail = {
  id: string
  name: string
}

// 在lib.es5.d.ts 种对Omit的定义是这样的
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

// 我们来自己实现一下Omit
type User = {
  id: string
  name: string
  email: string
}
// 首先我们需要找到所有 User 类型种的属性名，我们可以用keyof操作符来获取一个包含所有属性名字字符串的联合属性
type UersKeys = keyof User
// 等价于
type UersKeys = 'id' | 'name' | 'email'
// 然后我们需要能够把联合属性中的某个字符串字面量剔除出去的能力。那我们的 ​User​ 类型举例的话，
// 我们想要从 ​"id" | //"name" | "email"​ 中去掉 ​"email"​ 。我们可以用 ​Exclude<T, U>​ 帮助类型来做这件事：
type UersKeysWithoutEmail = Exclude<UersKeys, 'email'>

// 等价于
type UserKeysWithoutEmail = Exclude<'id' | 'name' | 'email', 'email'>

// 等价于:_
type UserKeysWithoutEmail = 'id' | 'name'

// ------ 这里差一句，Exclude的定义 ----
/**

 * Exclude from T those types that are assignable to U

 */

type Exclude<T, U> = T extends U ? never : T

/*
 * 最后，我们需要创意一个对象类型，包含 ​User​ 类型属性子集的对象类型。
 *其实更具体的说，就是要创建一个对象类型，它的属性都是在联合类型 ​UserKeysWithoutEmail​ 中的。
 *我们可以用 ​Pick<T, *K>​ 帮助类型来挑出来所有对应的属性名：
 */
type UserWithoutEmail = Pick<User, UsersKeysWithoutEmail>
// 等价于:

type UserWithoutEmail = Pick<User, 'id' | 'name'>

// 等价于:

type UserWithoutEmail = {
  id: string
  name: string
}

// ------ 这里差一句，​Pick<T, K>​ 的定义 ----
/**

 * From T, pick a set of properties whose keys are in the union K

 */

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

## 经过上面的演算推到我们来实现一个 Omit

```ts
type UserWithoutEmail=Pick<User,Exclude<keyof<User>,'email'>>

// 为了能够通用，我们加入泛型
type Omit=Pick<T,Exclude<keyof<T>,K>>

// 因为对象的键只能是字符串、数字或 Symbol，那么我们可以给 ​K​ 加个约束条件：
type Omit<T, K extends string | number | symbol> = Pick<T, Exclude<keyof T, K>>;

// 可以直接用keyof any 来代替
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### 于是我们现在完成了！我们已经实现了 lib.es5.d.ts 中定义的 ​Omit<T, K>​ 类型了

### 然后这节我们提一下，interface 和 type 的区别

> 请查阅这个链接[区别]([http://example.com/ "With a Title"](http://www.52codes.net/develop/javascript/57646.html)).
