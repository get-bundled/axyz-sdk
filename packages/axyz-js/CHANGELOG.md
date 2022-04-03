# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.5.0](https://github.com/get-bundled/axyz-sdk/compare/@axyzsdk/js@0.4.0...@axyzsdk/js@0.5.0) (2022-04-03)


### ⚠ BREAKING CHANGES

* significant API changes here. See types

### Features

* improve solana logic and context, add autoconnect wait ([e234b0c](https://github.com/get-bundled/axyz-sdk/commit/e234b0cbe319d7b4ba5bd29c5361dc1d6622d326))



## [0.4.0](https://github.com/get-bundled/axyz-sdk/compare/@axyzsdk/js@0.3.0...@axyzsdk/js@0.4.0) (2022-04-01)


### Features

* ethereum event listeners to sync with react ([f3d479f](https://github.com/get-bundled/axyz-sdk/commit/f3d479f3e099e185d49a2c683e3ba97893c56270))


### Bug Fixes

* ethereum support for entitlement validation ([423f698](https://github.com/get-bundled/axyz-sdk/commit/423f6980ddb2ccbb44dd5cae1460fd727af6f829))
* lint error ([b5a9028](https://github.com/get-bundled/axyz-sdk/commit/b5a902823ad7a76ab995c5df60dfe38f05544b35))



## [0.3.0](https://github.com/get-bundled/axyz-sdk/compare/@axyzsdk/js@0.2.1...@axyzsdk/js@0.3.0) (2022-03-29)


### ⚠ BREAKING CHANGES

* API interface has significantly changed to support solana and ethereum

### Features

* support ethereum wallets and validation ([a62d666](https://github.com/get-bundled/axyz-sdk/commit/a62d6660ecf93cba74091d938096c6aa10aa6d96))



### [0.2.1](https://github.com/get-bundled/axyz-sdk/compare/@axyzsdk/js@0.2.0...@axyzsdk/js@0.2.1) (2022-03-17)


### Bug Fixes

* only allow wallets that support sign message ([1a07d98](https://github.com/get-bundled/axyz-sdk/commit/1a07d98038ae7ccd17564db0ac63f11064eefe5d))



## [0.2.0](https://github.com/get-bundled/axyz-sdk/compare/@axyzsdk/js@0.1.0...@axyzsdk/js@0.2.0) (2022-03-15)


### ⚠ BREAKING CHANGES

* remove `getEntitlementByValue`
* removed `checkEntitlementByValue`

### Features

* add validate entitlement API function ([bed6690](https://github.com/get-bundled/axyz-sdk/commit/bed66905a4ea13764c9721b40751d01f3c1ebad3))
* support entitlement array for validation ([0fd4977](https://github.com/get-bundled/axyz-sdk/commit/0fd497792130bfa160dceb74bb3aef43177acc90))
* support storing and loading of signature ([f175520](https://github.com/get-bundled/axyz-sdk/commit/f1755201d0d67d2f78188b5370119067d86096de))


### Bug Fixes

* clear stored signature on disconnect ([a08dc1e](https://github.com/get-bundled/axyz-sdk/commit/a08dc1e8a8f31437b53c4aa84d05125044e56aaa))
* improve type exports ([45a38e6](https://github.com/get-bundled/axyz-sdk/commit/45a38e627aeba5658c10d689550977b3ea7e8062))
* move check entitlement logic to backend ([d251e35](https://github.com/get-bundled/axyz-sdk/commit/d251e35e5d14ba290dc2d73ab8ec0c4c105fe92c))


### Miscellaneous Chores

* remove `getEntitlementByValue` ([f1b6f32](https://github.com/get-bundled/axyz-sdk/commit/f1b6f327089ea4bf990ba13f0d85d048e8ee66a2))
* remove extra check entitlement function ([f017f78](https://github.com/get-bundled/axyz-sdk/commit/f017f782e02fadde3c69a080c4a4aff0cb23f826))



## 0.1.0 (2022-03-06)


### Features

* setup JS & React SDK :sunrise: ([9e4cc30](https://github.com/get-bundled/axyz-sdk/commit/9e4cc3072840e179c9b5047c62b39444bf5c5c20))
