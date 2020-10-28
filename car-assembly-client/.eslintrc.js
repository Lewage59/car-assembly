module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 10
    },
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended"
    ],
    plugins: [
        "vue"
    ],
    rules: {
        // don't require .vue extension when importing
        // 'import/extensions': ['error', 'always', {
        //     'js': 'never',
        //     'vue': 'never'
        // }],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        /*
         * Possible Errors
         */


        // 0-off: 不启用, 1-warn： 警告, 2-error： 报错

        // 禁止不使用类型检测操作符与null 比较
        "no-eq-null": "error",
        // 要求在for-in 中必须有一个if语句
        "guard-for-in": "off",
        //禁止在原型上修改方法
        "no-extend-native": "error",
        // 规定变量命名为驼峰
        "camelcase": [
            "off",
            {
                "properties": "always"
            }
        ],


        // 声明了变量，但是没有使用改成警告, 方便开发~
        'no-unused-vars': 'error',
        // disallow unnecessary parentheses
        'no-extra-parens': ['error', 'all', {'nestedBinaryExpressions': false}],

        // disallow negating the left operand of relational operators
        'no-unsafe-negation': 'error',

        // enforce valid JSDoc comments
        'valid-jsdoc': 'off',

        // 要求在特定位置添加 jsdoc 注释
        'require-jsdoc': [
            'error',
            {
                'require': {
                    'FunctionDeclaration': true,
                    'MethodDefinition': false,
                    'ClassDeclaration': true,
                    'ArrowFunctionExpression': false,
                    'FunctionExpression': false
                }
            }
        ],

        /*
         * Best Practices
         */

        // enforce return statements in callbacks of array methods
        'array-callback-return': 'error',

        // enforce consistent brace style for all control statements
        curly: ['error', 'multi-line'],

        // enforce consistent newlines before and after dots
        'dot-location': ['error', 'property'],

        // enforce dot notation whenever possible
        'dot-notation': 'off',

        // require the use of === and !==
        'eqeqeq': ['error', 'smart'],

        // disallow the use of arguments.caller or arguments.callee
        'no-caller': 'error',

        // disallow empty functions
        'no-empty-function': 'off',

        // disallow empty block statement
        'no-empty': 'off',

        // disallow unnecessary calls to .bind()
        'no-extra-bind': 'error',

        // disallow unnecessary labels
        'no-extra-label': 'error',

        // disallow leading or trailing decimal points in numeric literals
        'no-floating-decimal': 'error',

        // disallow assignments to native objects or read-only global variables
        'no-global-assign': 'error',

        // disallow the use of eval()-like methods
        'no-implied-eval': 'error',

        // disallow the use of the __iterator__ property
        'no-iterator': 'error',

        // disallow unnecessary nested blocks
        'no-lone-blocks': 'error',

        // disallow multiple spaces
        'no-multi-spaces': 'error',

        // disallow new operators with the String, Number, and Boolean objects
        'no-new-wrappers': 'error',

        // disallow octal escape sequences in string literals
        'no-octal-escape': 'error',

        // disallow the use of the __proto__ property
        'no-proto': 'error',

        // disallow comparisons where both sides are exactly the same
        'no-self-compare': 'error',

        // disallow throwing literals as exceptions
        'no-throw-literal': 'error',

        // disallow unused expressions
        'no-unused-expressions': 'off',

        // disallow unnecessary calls to .call() and .apply()
        'no-useless-call': 'error',

        // disallow unnecessary concatenation of literals or template literals
        'no-useless-concat': 'error',

        // disallow unnecessary escape characters
        'no-useless-escape': 'off',

        // disallow void operators
        'no-void': 'error',

        // 规定自执行函数的 被括号包住
        'wrap-iife': [
            'error',
            'outside'
        ],

        // require or disallow “Yoda” conditions
        yoda: 'error',

        /*
         * Variables
         */

        // disallow labels that share a name with a variable
        'no-label-var': 'error',

        // 规定变量能否重复定义
        'no-redeclare': 'error',

        //强制对象属性之间换行
        'object-property-newline': 'error',

        // 控制变量定义后换行
        'newline-after-var': ['error', 'always'],

        // disallow initializing variables to undefined
        'no-undef-init': 'error',
        'no-undef': 'off',
        // disallow the use of variables before they are defined
        'no-use-before-define': 'off',

        /*
         * Node.js and CommonJS
         */

        // disallow new operators with calls to require
        'no-new-require': 'error',

        /*
         * Stylistic Issues
         */

        // 强制行的最大长度
        'max-len': ['error', 140],

        // 规定数组[]前后的空格
        'array-bracket-spacing': [
            'error',
            'never'
        ],

        // 要求或禁止文件末尾保留一行空行
        'eol-last': 'off',

        // enforce consistent spacing inside single-line blocks
        'block-spacing': 'error',

        // enforce consistent brace style for blocks
        'brace-style': ['error', '1tbs', {'allowSingleLine': true}],

        // 要求或禁止拖尾括号
        'comma-dangle': [
            'error',
            'never'
        ],

        // 规定逗号前后的空格
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true,
            }
        ],

        // enforce consistent comma style
        'comma-style': 'error',

        // enforce consistent spacing inside computed property brackets
        'computed-property-spacing': 'error',

        // 规定函数调用时的空格
        'func-call-spacing': [
            'error',
            'never'
        ],

        // 缩进使用4个空格， SwitchCase 一个
        indent: ['error', 4, {"SwitchCase": 1}],

        // enforce the consistent use of either double or single quotes in JSX attributes
        'jsx-quotes': 'error',

        // 规定对象键和值得空格
        'key-spacing': [
            'error',
            {
                'beforeColon': false,
                'afterColon': true,
            }
        ],

        // 规定关键字前后的空格
        'keyword-spacing': [
            'error',
            {
                'before': true,
                'after': true,
            }
        ],

        // enforce consistent linebreak style
        // 'linebreak-style': process.env.NODE_ENV === 'production' ? 'off' : ['error', 'windows'],
        'linebreak-style': 'off',

        // require or disallow newlines around directives
        'lines-around-directive': 'error',

        // 构造函数首字母大写
        'new-cap': 'error',

        // require parentheses when invoking a constructor with no arguments
        'new-parens': 'error',

        // disallow Array constructors
        'no-array-constructor': 'error',

        // disallow Object constructors
        'no-new-object': 'error',

        // disallow trailing whitespace at the end of lines
        'no-trailing-spaces': 'off',

        // disallow ternary operators when simpler alternatives exist
        'no-unneeded-ternary': 'error',

        // disallow whitespace before properties
        'no-whitespace-before-property': 'error',

        // 规定{}的空格
        'object-curly-spacing': ['error', 'never'],

        // require or disallow padding within blocks
        'padded-blocks': ['error', 'never'],

        // require quotes around object literal property names
        'quote-props': ['error', 'as-needed'],

        // enforce the consistent use of either backticks, double, or single quotes
        quotes: ['error', 'single'],

        // 规定分号前后的空格
        'semi-spacing': [
            'error',
            {
                'before': false,
                'after': true,
            }
        ],

        // 要求或禁止使用分号代替 ASI
        semi: ['error', 'always'],

        // 强制在块之前使用一致的空格
        'space-before-blocks': [
            'error',
            'always'
        ],

        'no-console': 'off',

        // enforce consistent spacing before function definition opening parenthesis
        'space-before-function-paren': ['error', 'never'],

        // enforce consistent spacing inside parentheses
        'space-in-parens': 'error',

        // require spacing around infix operators
        'space-infix-ops': 'error',

        // 规定一元运算符号的空格
        'space-unary-ops': [
            'error',
            {
                'words': true,
                'nonwords': false,
            }
        ],

        // 规定注释的空格
        'spaced-comment': ['error', 'always', {
            'line': {
                'markers': ['/'],
                'exceptions': ['-', '+']
            },
            'block': {
                'markers': ['!'],
                'exceptions': ['*'],
                'balanced': true
            }
        }],

        // 控制注释的空行情况
        'lines-around-comment': [
            'error',
            {
                'beforeBlockComment': true,
            }
        ],

        // require or disallow Unicode byte order mark (BOM)
        'unicode-bom': 'error',


        /*
         * ECMAScript 6
         */

        // require braces around arrow function bodies
        'arrow-body-style': 'error',

        // require parentheses around arrow function arguments
        'arrow-parens': ['error', 'as-needed'],

        // enforce consistent spacing before and after the arrow in arrow functions
        'arrow-spacing': [
            'error',
            {
                'before': false,
                'after': true,
            }
        ],

        // enforce consistent spacing around * operators in generator functions
        'generator-star-spacing': ['error', 'after'],

        // disallow duplicate module imports
        'no-duplicate-imports': 'error',

        // disallow unnecessary computed property keys in object literals
        'no-useless-computed-key': 'error',

        // disallow unnecessary constructors
        'no-useless-constructor': 'error',

        // disallow renaming import, export, and destructured assignments to the same name
        'no-useless-rename': 'error',

        // require let or const instead of var
        'no-var': 'off',

        // require or disallow method and property shorthand syntax for object literals
        'object-shorthand': 'off',

        // require arrow functions as callbacks
        'prefer-arrow-callback': 'off',

        // require const declarations for variables that are never reassigned after declared
        'prefer-const': 'error',

        // disallow parseInt() in favor of binary, octal, and hexadecimal literals
        'prefer-numeric-literals': 'error',

        // require rest parameters instead of arguments
        'prefer-rest-params': 'error',

        // require spread operators instead of .apply()
        'prefer-spread': 'error',

        // enforce spacing between rest and spread operators and their expressions
        'rest-spread-spacing': 'error',

        // require or disallow spacing around embedded expressions of template strings
        'template-curly-spacing': 'error',

        // require or disallow spacing around the * in yield* expressions
        'yield-star-spacing': 'error'
    }
};
