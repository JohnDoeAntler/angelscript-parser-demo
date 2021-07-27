import { c as createCommonjsModule, a as commonjsGlobal } from '../../../common/_commonjsHelpers-8c19dec8.js';

var scriptcode = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCScriptCode = void 0;
class asCScriptCode {
    constructor() {
        this.code = '';
        this.linePositions = [];
    }
    SetCode(in_code) {
        this.linePositions.length = 0;
        if (!in_code) {
            throw new Error();
        }
        this.code = in_code;
        this.linePositions.push(0);
        for (let n = 0; n < in_code.length; n++) {
            if (in_code[n] == '\n') {
                this.linePositions.push(n + 1);
            }
        }
        this.linePositions.push(in_code.length);
    }
    ConvertPosToRowCol(pos) {
        if (this.linePositions.length == 0) {
            return {
                row: 0,
                col: 1,
            };
        }
        // Do a binary search in the buffer
        let max = this.linePositions.length - 1;
        let min = 0;
        let i = Math.floor(max / 2);
        while (true) {
            if (this.linePositions[i] < pos) {
                // Have we found the largest number < programPosition?
                if (min == i)
                    break;
                min = i;
                i = Math.floor((max + min) / 2);
            }
            else if (this.linePositions[i] > pos) {
                // Have we found the smallest number > programPoisition?
                if (max == i)
                    break;
                max = i;
                i = Math.floor((max + min) / 2);
            }
            else {
                // We found the exact position
                break;
            }
        }
        return {
            row: i + 1,
            col: pos - this.linePositions[i] + 1,
        };
    }
    TokenEquals(pos, len, str) {
        return this.code.substr(pos, len) === str;
    }
}
exports.asCScriptCode = asCScriptCode;

});

var tokendef = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROPERTY_TOKEN = exports.EXPLICIT_TOKEN = exports.EXTERNAL_TOKEN = exports.IF_HANDLE_TOKEN = exports.FUNCTION_TOKEN = exports.ABSTRACT_TOKEN = exports.SET_TOKEN = exports.GET_TOKEN = exports.OVERRIDE_TOKEN = exports.FINAL_TOKEN = exports.SHARED_TOKEN = exports.SUPER_TOKEN = exports.FROM_TOKEN = exports.THIS_TOKEN = exports.whiteSpace = exports.tokenWords = exports.TokenWord = exports.eTokenType = void 0;
var eTokenType;
(function (eTokenType) {
    eTokenType[eTokenType["ttUnrecognizedToken"] = 0] = "ttUnrecognizedToken";
    eTokenType[eTokenType["ttEnd"] = 1] = "ttEnd";
    // White space and comments
    eTokenType[eTokenType["ttWhiteSpace"] = 2] = "ttWhiteSpace";
    eTokenType[eTokenType["ttOnelineComment"] = 3] = "ttOnelineComment";
    eTokenType[eTokenType["ttMultilineComment"] = 4] = "ttMultilineComment";
    // Atoms
    eTokenType[eTokenType["ttIdentifier"] = 5] = "ttIdentifier";
    eTokenType[eTokenType["ttIntConstant"] = 6] = "ttIntConstant";
    eTokenType[eTokenType["ttFloatConstant"] = 7] = "ttFloatConstant";
    eTokenType[eTokenType["ttDoubleConstant"] = 8] = "ttDoubleConstant";
    eTokenType[eTokenType["ttStringConstant"] = 9] = "ttStringConstant";
    eTokenType[eTokenType["ttMultilineStringConstant"] = 10] = "ttMultilineStringConstant";
    eTokenType[eTokenType["ttHeredocStringConstant"] = 11] = "ttHeredocStringConstant";
    eTokenType[eTokenType["ttNonTerminatedStringConstant"] = 12] = "ttNonTerminatedStringConstant";
    eTokenType[eTokenType["ttBitsConstant"] = 13] = "ttBitsConstant";
    // Math operators
    eTokenType[eTokenType["ttPlus"] = 14] = "ttPlus";
    eTokenType[eTokenType["ttMinus"] = 15] = "ttMinus";
    eTokenType[eTokenType["ttStar"] = 16] = "ttStar";
    eTokenType[eTokenType["ttSlash"] = 17] = "ttSlash";
    eTokenType[eTokenType["ttPercent"] = 18] = "ttPercent";
    eTokenType[eTokenType["ttStarStar"] = 19] = "ttStarStar";
    eTokenType[eTokenType["ttHandle"] = 20] = "ttHandle";
    eTokenType[eTokenType["ttAddAssign"] = 21] = "ttAddAssign";
    eTokenType[eTokenType["ttSubAssign"] = 22] = "ttSubAssign";
    eTokenType[eTokenType["ttMulAssign"] = 23] = "ttMulAssign";
    eTokenType[eTokenType["ttDivAssign"] = 24] = "ttDivAssign";
    eTokenType[eTokenType["ttModAssign"] = 25] = "ttModAssign";
    eTokenType[eTokenType["ttPowAssign"] = 26] = "ttPowAssign";
    eTokenType[eTokenType["ttOrAssign"] = 27] = "ttOrAssign";
    eTokenType[eTokenType["ttAndAssign"] = 28] = "ttAndAssign";
    eTokenType[eTokenType["ttXorAssign"] = 29] = "ttXorAssign";
    eTokenType[eTokenType["ttShiftLeftAssign"] = 30] = "ttShiftLeftAssign";
    eTokenType[eTokenType["ttShiftRightLAssign"] = 31] = "ttShiftRightLAssign";
    eTokenType[eTokenType["ttShiftRightAAssign"] = 32] = "ttShiftRightAAssign";
    eTokenType[eTokenType["ttInc"] = 33] = "ttInc";
    eTokenType[eTokenType["ttDec"] = 34] = "ttDec";
    eTokenType[eTokenType["ttDot"] = 35] = "ttDot";
    eTokenType[eTokenType["ttScope"] = 36] = "ttScope";
    // Statement tokens
    eTokenType[eTokenType["ttAssignment"] = 37] = "ttAssignment";
    eTokenType[eTokenType["ttEndStatement"] = 38] = "ttEndStatement";
    eTokenType[eTokenType["ttListSeparator"] = 39] = "ttListSeparator";
    eTokenType[eTokenType["ttStartStatementBlock"] = 40] = "ttStartStatementBlock";
    eTokenType[eTokenType["ttEndStatementBlock"] = 41] = "ttEndStatementBlock";
    eTokenType[eTokenType["ttOpenParanthesis"] = 42] = "ttOpenParanthesis";
    eTokenType[eTokenType["ttCloseParanthesis"] = 43] = "ttCloseParanthesis";
    eTokenType[eTokenType["ttOpenBracket"] = 44] = "ttOpenBracket";
    eTokenType[eTokenType["ttCloseBracket"] = 45] = "ttCloseBracket";
    eTokenType[eTokenType["ttAmp"] = 46] = "ttAmp";
    // Bitwise operators
    eTokenType[eTokenType["ttBitOr"] = 47] = "ttBitOr";
    eTokenType[eTokenType["ttBitNot"] = 48] = "ttBitNot";
    eTokenType[eTokenType["ttBitXor"] = 49] = "ttBitXor";
    eTokenType[eTokenType["ttBitShiftLeft"] = 50] = "ttBitShiftLeft";
    eTokenType[eTokenType["ttBitShiftRight"] = 51] = "ttBitShiftRight";
    eTokenType[eTokenType["ttBitShiftRightArith"] = 52] = "ttBitShiftRightArith";
    // Compare operators
    eTokenType[eTokenType["ttEqual"] = 53] = "ttEqual";
    eTokenType[eTokenType["ttNotEqual"] = 54] = "ttNotEqual";
    eTokenType[eTokenType["ttLessThan"] = 55] = "ttLessThan";
    eTokenType[eTokenType["ttGreaterThan"] = 56] = "ttGreaterThan";
    eTokenType[eTokenType["ttLessThanOrEqual"] = 57] = "ttLessThanOrEqual";
    eTokenType[eTokenType["ttGreaterThanOrEqual"] = 58] = "ttGreaterThanOrEqual";
    eTokenType[eTokenType["ttQuestion"] = 59] = "ttQuestion";
    eTokenType[eTokenType["ttColon"] = 60] = "ttColon";
    // Reserved keywords
    eTokenType[eTokenType["ttIf"] = 61] = "ttIf";
    eTokenType[eTokenType["ttElse"] = 62] = "ttElse";
    eTokenType[eTokenType["ttFor"] = 63] = "ttFor";
    eTokenType[eTokenType["ttWhile"] = 64] = "ttWhile";
    eTokenType[eTokenType["ttBool"] = 65] = "ttBool";
    eTokenType[eTokenType["ttFuncDef"] = 66] = "ttFuncDef";
    eTokenType[eTokenType["ttImport"] = 67] = "ttImport";
    eTokenType[eTokenType["ttInt"] = 68] = "ttInt";
    eTokenType[eTokenType["ttInt8"] = 69] = "ttInt8";
    eTokenType[eTokenType["ttInt16"] = 70] = "ttInt16";
    eTokenType[eTokenType["ttInt64"] = 71] = "ttInt64";
    eTokenType[eTokenType["ttInterface"] = 72] = "ttInterface";
    eTokenType[eTokenType["ttIs"] = 73] = "ttIs";
    eTokenType[eTokenType["ttNotIs"] = 74] = "ttNotIs";
    eTokenType[eTokenType["ttUInt"] = 75] = "ttUInt";
    eTokenType[eTokenType["ttUInt8"] = 76] = "ttUInt8";
    eTokenType[eTokenType["ttUInt16"] = 77] = "ttUInt16";
    eTokenType[eTokenType["ttUInt64"] = 78] = "ttUInt64";
    eTokenType[eTokenType["ttFloat"] = 79] = "ttFloat";
    eTokenType[eTokenType["ttVoid"] = 80] = "ttVoid";
    eTokenType[eTokenType["ttTrue"] = 81] = "ttTrue";
    eTokenType[eTokenType["ttFalse"] = 82] = "ttFalse";
    eTokenType[eTokenType["ttReturn"] = 83] = "ttReturn";
    eTokenType[eTokenType["ttNot"] = 84] = "ttNot";
    eTokenType[eTokenType["ttAnd"] = 85] = "ttAnd";
    eTokenType[eTokenType["ttOr"] = 86] = "ttOr";
    eTokenType[eTokenType["ttXor"] = 87] = "ttXor";
    eTokenType[eTokenType["ttBreak"] = 88] = "ttBreak";
    eTokenType[eTokenType["ttContinue"] = 89] = "ttContinue";
    eTokenType[eTokenType["ttConst"] = 90] = "ttConst";
    eTokenType[eTokenType["ttDo"] = 91] = "ttDo";
    eTokenType[eTokenType["ttDouble"] = 92] = "ttDouble";
    eTokenType[eTokenType["ttSwitch"] = 93] = "ttSwitch";
    eTokenType[eTokenType["ttCase"] = 94] = "ttCase";
    eTokenType[eTokenType["ttDefault"] = 95] = "ttDefault";
    eTokenType[eTokenType["ttIn"] = 96] = "ttIn";
    eTokenType[eTokenType["ttOut"] = 97] = "ttOut";
    eTokenType[eTokenType["ttInOut"] = 98] = "ttInOut";
    eTokenType[eTokenType["ttNull"] = 99] = "ttNull";
    eTokenType[eTokenType["ttClass"] = 100] = "ttClass";
    eTokenType[eTokenType["ttTypedef"] = 101] = "ttTypedef";
    eTokenType[eTokenType["ttEnum"] = 102] = "ttEnum";
    eTokenType[eTokenType["ttCast"] = 103] = "ttCast";
    eTokenType[eTokenType["ttPrivate"] = 104] = "ttPrivate";
    eTokenType[eTokenType["ttProtected"] = 105] = "ttProtected";
    eTokenType[eTokenType["ttNamespace"] = 106] = "ttNamespace";
    eTokenType[eTokenType["ttMixin"] = 107] = "ttMixin";
    eTokenType[eTokenType["ttAuto"] = 108] = "ttAuto";
    eTokenType[eTokenType["ttTry"] = 109] = "ttTry";
    eTokenType[eTokenType["ttCatch"] = 110] = "ttCatch";
})(eTokenType = exports.eTokenType || (exports.eTokenType = {}));
class TokenWord {
    constructor(word, wordLength, tokenType) {
        this.word = word;
        this.wordLength = wordLength;
        this.tokenType = tokenType;
    }
}
exports.TokenWord = TokenWord;
const asTokenDef = (str, tok) => {
    return new TokenWord(str, str.length, tok);
};
exports.tokenWords = [
    asTokenDef('+', eTokenType.ttPlus),
    asTokenDef('+=', eTokenType.ttAddAssign),
    asTokenDef('++', eTokenType.ttInc),
    asTokenDef('-', eTokenType.ttMinus),
    asTokenDef('-=', eTokenType.ttSubAssign),
    asTokenDef('--', eTokenType.ttDec),
    asTokenDef('*', eTokenType.ttStar),
    asTokenDef('*=', eTokenType.ttMulAssign),
    asTokenDef('/', eTokenType.ttSlash),
    asTokenDef('/=', eTokenType.ttDivAssign),
    asTokenDef('%', eTokenType.ttPercent),
    asTokenDef('%=', eTokenType.ttModAssign),
    asTokenDef('**', eTokenType.ttStarStar),
    asTokenDef('**=', eTokenType.ttPowAssign),
    asTokenDef('=', eTokenType.ttAssignment),
    asTokenDef('==', eTokenType.ttEqual),
    asTokenDef('.', eTokenType.ttDot),
    asTokenDef('|', eTokenType.ttBitOr),
    asTokenDef('|=', eTokenType.ttOrAssign),
    asTokenDef('||', eTokenType.ttOr),
    asTokenDef('&', eTokenType.ttAmp),
    asTokenDef('&=', eTokenType.ttAndAssign),
    asTokenDef('&&', eTokenType.ttAnd),
    asTokenDef('^', eTokenType.ttBitXor),
    asTokenDef('^=', eTokenType.ttXorAssign),
    asTokenDef('^^', eTokenType.ttXor),
    asTokenDef('<', eTokenType.ttLessThan),
    asTokenDef('<=', eTokenType.ttLessThanOrEqual),
    asTokenDef('<<', eTokenType.ttBitShiftLeft),
    asTokenDef('<<=', eTokenType.ttShiftLeftAssign),
    asTokenDef('>', eTokenType.ttGreaterThan),
    asTokenDef('>=', eTokenType.ttGreaterThanOrEqual),
    asTokenDef('>>', eTokenType.ttBitShiftRight),
    asTokenDef('>>=', eTokenType.ttShiftRightLAssign),
    asTokenDef('>>>', eTokenType.ttBitShiftRightArith),
    asTokenDef('>>>=', eTokenType.ttShiftRightAAssign),
    asTokenDef('~', eTokenType.ttBitNot),
    asTokenDef(';', eTokenType.ttEndStatement),
    asTokenDef(',', eTokenType.ttListSeparator),
    asTokenDef('{', eTokenType.ttStartStatementBlock),
    asTokenDef('}', eTokenType.ttEndStatementBlock),
    asTokenDef('(', eTokenType.ttOpenParanthesis),
    asTokenDef(')', eTokenType.ttCloseParanthesis),
    asTokenDef('[', eTokenType.ttOpenBracket),
    asTokenDef(']', eTokenType.ttCloseBracket),
    asTokenDef('?', eTokenType.ttQuestion),
    asTokenDef(':', eTokenType.ttColon),
    asTokenDef('::', eTokenType.ttScope),
    asTokenDef('!', eTokenType.ttNot),
    asTokenDef('!=', eTokenType.ttNotEqual),
    asTokenDef('!is', eTokenType.ttNotIs),
    asTokenDef('@', eTokenType.ttHandle),
    asTokenDef('and', eTokenType.ttAnd),
    asTokenDef('auto', eTokenType.ttAuto),
    asTokenDef('bool', eTokenType.ttBool),
    asTokenDef('break', eTokenType.ttBreak),
    asTokenDef('case', eTokenType.ttCase),
    asTokenDef('cast', eTokenType.ttCast),
    asTokenDef('catch', eTokenType.ttCatch),
    asTokenDef('class', eTokenType.ttClass),
    asTokenDef('const', eTokenType.ttConst),
    asTokenDef('continue', eTokenType.ttContinue),
    asTokenDef('default', eTokenType.ttDefault),
    asTokenDef('do', eTokenType.ttDo),
    asTokenDef('double', eTokenType.ttDouble),
    asTokenDef('else', eTokenType.ttElse),
    asTokenDef('enum', eTokenType.ttEnum),
    asTokenDef('false', eTokenType.ttFalse),
    asTokenDef('float', eTokenType.ttFloat),
    asTokenDef('for', eTokenType.ttFor),
    asTokenDef('funcdef', eTokenType.ttFuncDef),
    asTokenDef('if', eTokenType.ttIf),
    asTokenDef('import', eTokenType.ttImport),
    asTokenDef('in', eTokenType.ttIn),
    asTokenDef('inout', eTokenType.ttInOut),
    asTokenDef('int', eTokenType.ttInt),
    asTokenDef('int8', eTokenType.ttInt8),
    asTokenDef('int16', eTokenType.ttInt16),
    asTokenDef('int32', eTokenType.ttInt),
    asTokenDef('int64', eTokenType.ttInt64),
    asTokenDef('interface', eTokenType.ttInterface),
    asTokenDef('is', eTokenType.ttIs),
    asTokenDef('mixin', eTokenType.ttMixin),
    asTokenDef('namespace', eTokenType.ttNamespace),
    asTokenDef('not', eTokenType.ttNot),
    asTokenDef('null', eTokenType.ttNull),
    asTokenDef('or', eTokenType.ttOr),
    asTokenDef('out', eTokenType.ttOut),
    asTokenDef('private', eTokenType.ttPrivate),
    asTokenDef('protected', eTokenType.ttProtected),
    asTokenDef('return', eTokenType.ttReturn),
    asTokenDef('switch', eTokenType.ttSwitch),
    asTokenDef('true', eTokenType.ttTrue),
    asTokenDef('try', eTokenType.ttTry),
    asTokenDef('typedef', eTokenType.ttTypedef),
    asTokenDef('uint', eTokenType.ttUInt),
    asTokenDef('uint8', eTokenType.ttUInt8),
    asTokenDef('uint16', eTokenType.ttUInt16),
    asTokenDef('uint32', eTokenType.ttUInt),
    asTokenDef('uint64', eTokenType.ttUInt64),
    asTokenDef('void', eTokenType.ttVoid),
    asTokenDef('while', eTokenType.ttWhile),
    asTokenDef('xor', eTokenType.ttXor),
];
exports.whiteSpace = ' \t\r\n';
// Some keywords that are not considered tokens by the parser
// These only have meaning in specific situations. Outside these
// situations they are treated as normal identifiers.
exports.THIS_TOKEN = 'this';
exports.FROM_TOKEN = 'from';
exports.SUPER_TOKEN = 'super';
exports.SHARED_TOKEN = 'shared';
exports.FINAL_TOKEN = 'final';
exports.OVERRIDE_TOKEN = 'override';
exports.GET_TOKEN = 'get';
exports.SET_TOKEN = 'set';
exports.ABSTRACT_TOKEN = 'abstract';
exports.FUNCTION_TOKEN = 'function';
exports.IF_HANDLE_TOKEN = 'if_handle_then_const';
exports.EXTERNAL_TOKEN = 'external';
exports.EXPLICIT_TOKEN = 'explicit';
exports.PROPERTY_TOKEN = 'property';

});

var scriptnode = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCScriptNode = exports.sToken = exports.eScriptNode = void 0;
(function (eScriptNode) {
    eScriptNode[eScriptNode["snUndefined"] = 0] = "snUndefined";
    eScriptNode[eScriptNode["snScript"] = 1] = "snScript";
    eScriptNode[eScriptNode["snFunction"] = 2] = "snFunction";
    eScriptNode[eScriptNode["snConstant"] = 3] = "snConstant";
    eScriptNode[eScriptNode["snDataType"] = 4] = "snDataType";
    eScriptNode[eScriptNode["snIdentifier"] = 5] = "snIdentifier";
    eScriptNode[eScriptNode["snParameterList"] = 6] = "snParameterList";
    eScriptNode[eScriptNode["snStatementBlock"] = 7] = "snStatementBlock";
    eScriptNode[eScriptNode["snDeclaration"] = 8] = "snDeclaration";
    eScriptNode[eScriptNode["snExpressionStatement"] = 9] = "snExpressionStatement";
    eScriptNode[eScriptNode["snIf"] = 10] = "snIf";
    eScriptNode[eScriptNode["snFor"] = 11] = "snFor";
    eScriptNode[eScriptNode["snWhile"] = 12] = "snWhile";
    eScriptNode[eScriptNode["snReturn"] = 13] = "snReturn";
    eScriptNode[eScriptNode["snExpression"] = 14] = "snExpression";
    eScriptNode[eScriptNode["snExprTerm"] = 15] = "snExprTerm";
    eScriptNode[eScriptNode["snFunctionCall"] = 16] = "snFunctionCall";
    eScriptNode[eScriptNode["snConstructCall"] = 17] = "snConstructCall";
    eScriptNode[eScriptNode["snArgList"] = 18] = "snArgList";
    eScriptNode[eScriptNode["snExprPreOp"] = 19] = "snExprPreOp";
    eScriptNode[eScriptNode["snExprPostOp"] = 20] = "snExprPostOp";
    eScriptNode[eScriptNode["snExprOperator"] = 21] = "snExprOperator";
    eScriptNode[eScriptNode["snExprValue"] = 22] = "snExprValue";
    eScriptNode[eScriptNode["snBreak"] = 23] = "snBreak";
    eScriptNode[eScriptNode["snContinue"] = 24] = "snContinue";
    eScriptNode[eScriptNode["snDoWhile"] = 25] = "snDoWhile";
    eScriptNode[eScriptNode["snAssignment"] = 26] = "snAssignment";
    eScriptNode[eScriptNode["snCondition"] = 27] = "snCondition";
    eScriptNode[eScriptNode["snSwitch"] = 28] = "snSwitch";
    eScriptNode[eScriptNode["snCase"] = 29] = "snCase";
    eScriptNode[eScriptNode["snImport"] = 30] = "snImport";
    eScriptNode[eScriptNode["snClass"] = 31] = "snClass";
    eScriptNode[eScriptNode["snInitList"] = 32] = "snInitList";
    eScriptNode[eScriptNode["snInterface"] = 33] = "snInterface";
    eScriptNode[eScriptNode["snEnum"] = 34] = "snEnum";
    eScriptNode[eScriptNode["snTypedef"] = 35] = "snTypedef";
    eScriptNode[eScriptNode["snCast"] = 36] = "snCast";
    eScriptNode[eScriptNode["snVariableAccess"] = 37] = "snVariableAccess";
    eScriptNode[eScriptNode["snFuncDef"] = 38] = "snFuncDef";
    eScriptNode[eScriptNode["snVirtualProperty"] = 39] = "snVirtualProperty";
    eScriptNode[eScriptNode["snNamespace"] = 40] = "snNamespace";
    eScriptNode[eScriptNode["snMixin"] = 41] = "snMixin";
    eScriptNode[eScriptNode["snListPattern"] = 42] = "snListPattern";
    eScriptNode[eScriptNode["snNamedArgument"] = 43] = "snNamedArgument";
    eScriptNode[eScriptNode["snScope"] = 44] = "snScope";
    eScriptNode[eScriptNode["snTryCatch"] = 45] = "snTryCatch";
})(exports.eScriptNode || (exports.eScriptNode = {}));
class sToken {
    constructor(type, pos, length) {
        this.type = type;
        this.pos = pos;
        this.length = length;
    }
}
exports.sToken = sToken;
class asCScriptNode {
    constructor(nodeType) {
        this.nodeType = nodeType;
        this.tokenType = tokendef.eTokenType.ttUnrecognizedToken;
        this.tokenPos = 0;
        this.tokenLength = 0;
        this.parent = null;
        this.next = null;
        this.prev = null;
        this.firstChild = null;
        this.lastChild = null;
    }
    CreateCopy() {
        let node = new asCScriptNode(this.nodeType);
        node.tokenLength = this.tokenLength;
        node.tokenPos = this.tokenPos;
        node.tokenType = this.tokenType;
        let child = this.firstChild;
        while (child) {
            node.AddChildLast(child.CreateCopy());
            child = child.next;
        }
        return node;
    }
    SetToken(token) {
        this.tokenType = token.type;
    }
    UpdateSourcePos(pos, length) {
        if (pos == 0 && length == 0)
            return;
        if (this.tokenPos == 0 && this.tokenLength == 0) {
            this.tokenPos = pos;
            this.tokenLength = length;
        }
        else if (this.tokenPos > pos) {
            this.tokenLength = this.tokenPos + this.tokenLength - pos;
            this.tokenPos = pos;
        }
        else if (pos + length > this.tokenPos + this.tokenLength) {
            this.tokenLength = pos + length - this.tokenPos;
        }
    }
    AddChildLast(node) {
        if (this.lastChild) {
            this.lastChild.next = node;
            node.next = null;
            node.prev = this.lastChild;
            node.parent = this;
            this.lastChild = node;
        }
        else {
            this.firstChild = node;
            this.lastChild = node;
            node.next = null;
            node.prev = null;
            node.parent = this;
        }
        this.UpdateSourcePos(node.tokenPos, node.tokenLength);
    }
    DisconnectParent() {
        if (this.parent) {
            if (this.parent.firstChild == this)
                this.parent.firstChild = this.next;
            if (this.parent.lastChild == this)
                this.parent.lastChild = this.prev;
        }
        if (this.next)
            this.next.prev = this.prev;
        if (this.prev)
            this.prev.next = this.next;
        this.parent = null;
        this.next = null;
        this.prev = null;
    }
}
exports.asCScriptNode = asCScriptNode;

});

var texts = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.TXT_EXPECTED_CONSTANT = exports.TXT_EXPECTED_s = exports.TXT_EMPTY_SWITCH = exports.TXT_EMPTY_LIST_ELEMENT_IS_NOT_ALLOWED = exports.TXT_ELSE_WITH_EMPTY_STATEMENT = exports.TXT_DUPLICATE_SWITCH_CASE = exports.TXT_DISALLOW_COMPOUND_ASSIGN_ON_REF_TYPE = exports.TXT_DISALLOW_ASSIGN_ON_REF_TYPE = exports.TXT_DESTRUCTOR_s_s_NAME_ERROR = exports.TXT_DESTRUCTOR_MAY_NOT_HAVE_PARM = exports.TXT_DERIVED_METHOD_MUST_HAVE_SAME_RETTYPE_s = exports.TXT_DUPLICATE_NAMED_ARG = exports.TXT_DEF_ARG_TYPE_DOESNT_MATCH = exports.TXT_DEF_ARG_MISSING_IN_FUNC_s = exports.TXT_DEFAULT_MUST_BE_LAST = exports.TXT_DECL_IN_SWITCH = exports.TXT_DATA_TYPE_CANT_BE_s = exports.TXT_PROP_ACCESS_s_EXPECTS_INDEX = exports.TXT_PROP_ACCESS_s_DOES_NOT_EXPECT_INDEX = exports.TXT_COMPOUND_ASGN_REQUIRE_GET_SET = exports.TXT_COMPOUND_ASGN_WITH_IDX_PROP = exports.TXT_COMPOUND_ASGN_ON_VALUE_TYPE = exports.TXT_COMPILING_s = exports.TXT_CLASS_CANT_BE_FINAL_AND_ABSTRACT = exports.TXT_CHANGE_SIGN = exports.TXT_CANT_RETURN_VALUE = exports.TXT_CANT_IMPLICITLY_CONVERT_s_TO_s = exports.TXT_CANT_CONSTRUCT_s_USE_REF_CAST = exports.TXT_CANNOT_RETURN_REF_TO_LOCAL = exports.TXT_CANNOT_ACCESS_NON_STATIC_MEMBER_s = exports.TXT_CANNOT_RESOLVE_AUTO = exports.TXT_CANNOT_PASS_CLASS_METHOD_AS_ARG = exports.TXT_CANNOT_INHERIT_FROM_SELF = exports.TXT_CANNOT_INHERIT_FROM_MULTIPLE_CLASSES = exports.TXT_CANNOT_INHERIT_FROM_s_FINAL = exports.TXT_CANNOT_IMPLEMENT_SELF = exports.TXT_CANNOT_CREATE_DELEGATE_FOR_NOREF_TYPES = exports.TXT_CANNOT_CALL_CONSTRUCTOR_TWICE = exports.TXT_CANNOT_CALL_CONSTRUCTOR_IN_SWITCH = exports.TXT_CANNOT_CALL_CONSTRUCTOR_IN_LOOPS = exports.TXT_CANDIDATES_ARE = exports.TEXT_BASE_DOESNT_HAVE_DEF_CONSTR = exports.TXT_BOTH_CONDITIONS_MUST_CALL_CONSTRUCTOR = exports.TXT_BOTH_MUST_BE_SAME = exports.TXT_AUTO_NOT_ALLOWED = exports.TXT_ATTR_s_INFORMED_MULTIPLE_TIMES = exports.TXT_ARG_NOT_LVALUE = exports.TXT_ACCESSING_PRIVATE_PROP_s = exports.TXT_ABSTRACT_CLASS_s_CANNOT_BE_INSTANTIATED = exports.TXT_s_ALREADY_DECLARED = void 0;
exports.TXT_INVALID_EXPRESSION_AMBIGUOUS_NAME = exports.TXT_INVALID_ESCAPE_SEQUENCE = exports.TXT_INVALID_CONTINUE = exports.TXT_INVALID_CHAR_LITERAL = exports.TXT_INVALID_BREAK = exports.TXT_INTERFACE_CAN_ONLY_IMPLEMENT_INTERFACE = exports.TXT_INTERFACE_s_CANNOT_BE_INSTANTIATED = exports.TXT_INSTEAD_FOUND_KEYWORD_s = exports.TXT_INSTEAD_FOUND_IDENTIFIER_s = exports.TXT_INSTEAD_FOUND_s = exports.TXT_INSTANCING_INVLD_TMPL_TYPE_s_s = exports.TXT_INIT_LIST_CANNOT_BE_USED_WITH_s = exports.TXT_INHERITED_PRIVATE_PROP_ACCESS_s = exports.TXT_ILLEGAL_VARIABLE_NAME_s = exports.TXT_ILLEGAL_TARGET_TYPE_FOR_REF_CAST = exports.TXT_ILLEGAL_OPERATION_ON_s = exports.TXT_ILLEGAL_OPERATION = exports.TXT_ILLEGAL_MEMBER_TYPE = exports.TXT_IF_WITH_EMPTY_STATEMENT = exports.TXT_IDENTIFIER_s_NOT_DATA_TYPE_IN_NS_s = exports.TXT_IDENTIFIER_s_NOT_DATA_TYPE_IN_GLOBAL_NS = exports.TXT_IDENTIFIER_s_NOT_DATA_TYPE = exports.TXT_s_HIDES_VAR_IN_OUTER_SCOPE = exports.TXT_HANDLE_OF_HANDLE_IS_NOT_ALLOWED = exports.TXT_HANDLE_COMPARISON = exports.TXT_HANDLE_ASSIGN_ON_NON_HANDLE_PROP = exports.TXT_GLOBAL_VARS_NOT_ALLOWED = exports.TXT_GET_SET_ACCESSOR_TYPE_MISMATCH_FOR_s = exports.TXT_FUNCTION_s_NOT_FOUND = exports.TXT_FUNCTION_ALREADY_EXIST = exports.TXT_FOUND_MULTIPLE_ENUM_VALUES = exports.TXT_FLOAT_CONV_TO_INT_CAUSE_TRUNC = exports.TXT_FAILED_TO_CREATE_TEMP_OBJ = exports.TXT_FAILED_TO_COMPILE_DEF_ARG_d_IN_FUNC_s = exports.TXT_EXTERNAL_SHARED_s_CANNOT_REDEF = exports.TXT_EXTERNAL_SHARED_s_NOT_FOUND = exports.TXT_EXPR_s_IS_DATA_TYPE = exports.TXT_EXPR_MUST_BE_BOOL = exports.TXT_EXPR_DOESNT_EVAL_TO_FUNC = exports.TXT_EXPECTED_STRING = exports.TXT_EXPECTED_PRE_OPERATOR = exports.TXT_EXPECTED_POST_OPERATOR = exports.TXT_EXPECTED_s_OR_s = exports.TXT_EXPECTED_OPERATOR = exports.TXT_EXPECTED_ONE_OF = exports.TXT_EXPECTED_METHOD_OR_PROPERTY = exports.TXT_EXPECTED_LIST = exports.TXT_EXPECTED_IDENTIFIER = exports.TXT_EXPECTED_EXPRESSION_VALUE = exports.TXT_EXPECTED_DATA_TYPE = void 0;
exports.TXT_NO_COPY_CONSTRUCTOR_FOR_s = exports.TXT_NO_DEFAULT_COPY_OP_FOR_s = exports.TXT_NO_DEFAULT_CONSTRUCTOR_FOR_s = exports.TXT_NO_DEFAULT_ARRAY_TYPE = exports.TXT_NO_CONVERSION_s_TO_MATH_TYPE = exports.TXT_NO_CONVERSION_s_TO_s = exports.TXT_NO_APPROPRIATE_OPEQUALS = exports.TXT_NO_APPROPRIATE_OPHNDLASSIGN_s = exports.TXT_NO_APPROPRIATE_INDEX_OPERATOR = exports.TXT_NAMED_ARGS_WITH_OLD_SYNTAX = exports.TXT_NAME_CONFLICT_s_ALREADY_USED = exports.TXT_NAME_CONFLICT_s_METHOD = exports.TXT_NAME_CONFLICT_s_OBJ_PROPERTY = exports.TXT_NAME_CONFLICT_s_STRUCT = exports.TXT_NAME_CONFLICT_s_IS_VIRTPROP = exports.TXT_NAME_CONFLICT_s_IS_MIXIN = exports.TXT_NAME_CONFLICT_s_IS_FUNCTION = exports.TXT_NAME_CONFLICT_s_IS_FUNCDEF = exports.TXT_NAME_CONFLICT_s_IS_NAMED_TYPE = exports.TXT_NAME_CONFLICT_s_GLOBAL_PROPERTY = exports.TXT_NAME_CONFLICT_s_EXTENDED_TYPE = exports.TXT_NAMESPACE_s_DOESNT_EXIST = exports.TXT_MUST_RETURN_VALUE = exports.TXT_MUST_BE_OBJECT = exports.TXT_MULTILINE_STRINGS_NOT_ALLOWED = exports.TXT_MULTIPLE_PROP_SET_ACCESSOR_FOR_s = exports.TXT_MULTIPLE_PROP_GET_ACCESSOR_FOR_s = exports.TXT_MULTIPLE_MATCHING_SIGNATURES_TO_s = exports.TXT_MORE_THAN_ONE_MATCHING_OP = exports.TXT_MIXIN_CANNOT_HAVE_CHILD_TYPES = exports.TXT_MIXIN_CLASS_CANNOT_INHERIT = exports.TXT_MIXIN_CANNOT_HAVE_CONSTRUCTOR = exports.TXT_MIXIN_CANNOT_BE_DECLARED_AS_s = exports.TXT_MISSING_DEFINITION_OF_s = exports.TXT_MISSING_IMPLEMENTATION_OF_s = exports.TXT_METHOD_s_NOT_PART_OF_OBJECT_s = exports.TXT_METHOD_s_s_HAS_NO_RETURN_TYPE = exports.TXT_METHOD_s_DOES_NOT_OVERRIDE = exports.TXT_METHOD_CANT_HAVE_NAME_OF_CLASS = exports.TXT_METHOD_CANNOT_OVERRIDE_s = exports.TXT_INVALID_USE_OF_NAMED_ARGS = exports.TXT_INVALID_UNICODE_SEQUENCE_IN_SRC = exports.TXT_INVALID_UNICODE_VALUE = exports.TXT_INVALID_UNICODE_FORMAT_EXPECTED_d = exports.TXT_INVALID_TYPE = exports.TXT_INVALID_SIG_FOR_VIRTPROP = exports.TXT_INVALID_SCOPE = exports.TXT_INVALID_REF_PROP_ACCESS = exports.TXT_INVALID_OP_ON_METHOD = exports.TXT_INVALID_EXPRESSION_LAMBDA = void 0;
exports.TXT_SHARED_CANNOT_CALL_NON_SHARED_FUNC_s = exports.TXT_SHARED_CANNOT_ACCESS_NON_SHARED_VAR_s = exports.TXT_RETURN_CANT_BE_s = exports.TXT_REF_TYPE_CANT_BE_RETURNED_BY_VAL = exports.TXT_REF_TYPE_CANT_BE_PASSED_BY_VAL = exports.TXT_REF_IS_TEMP = exports.TXT_REF_IS_READ_ONLY = exports.TXT_REF_CANT_BE_RETURNED_LOCAL_VARS = exports.TXT_REF_CANT_BE_RETURNED_DEFERRED_PARAM = exports.TXT_REF_CANT_BE_TO_LOCAL_VAR = exports.TXT_PROPERTY_WITHOUT_ACCESSOR = exports.TXT_PROPERTY_HAS_NO_SET_ACCESSOR = exports.TXT_PROPERTY_HAS_NO_GET_ACCESSOR = exports.TXT_PROPERTY_CANT_BE_CONST = exports.TXT_PROPERTY_ACCESSOR_MUST_BE_IMPLEMENTED = exports.TXT_PROPERTY_ACCESSOR_DISABLED = exports.TXT_PROP_ACCESS_WITH_INDEX_ONE_ARG = exports.TXT_PROTECTED_PROP_ACCESS_s = exports.TXT_PROTECTED_METHOD_CALL_s = exports.TXT_PRIVATE_PROP_ACCESS_s = exports.TXT_PRIVATE_METHOD_CALL_s = exports.TXT_PREV_ERROR_WHILE_COMP_LIST_FOR_TYPE_s = exports.TXT_POS_ARG_AFTER_NAMED_ARG = exports.TXT_PARAMETER_CANT_BE_s = exports.TXT_PARAMETER_ALREADY_DECLARED = exports.TXT_OVERLOAD_CONFLICTS_DUE_TO_DEFAULT_ARGS = exports.TXT_OPERANDS_MUST_BE_HANDLES = exports.TXT_ONLY_ONE_VARIABLE_ALLOWED = exports.TXT_ONLY_ONE_FUNCTION_ALLOWED = exports.TXT_ONLY_ONE_ARGUMENT_IN_CAST = exports.TXT_ONLY_OBJECTS_MAY_USE_REF_INOUT = exports.TXT_OBJECT_HANDLE_NOT_SUPPORTED = exports.TXT_OBJECT_DOESNT_SUPPORT_INDEX_OP = exports.TXT_NOTHING_WAS_BUILT = exports.TXT_NOT_VALID_LVALUE = exports.TXT_NOT_VALID_REFERENCE = exports.TXT_s_NOT_MEMBER_OF_s = exports.TXT_NOT_LVALUE = exports.TXT_s_NOT_INITIALIZED = exports.TXT_NOT_EXACT = exports.TXT_s_NOT_DECLARED = exports.TXT_NOT_ENOUGH_VALUES_FOR_LIST = exports.TXT_NOT_ALL_PATHS_RETURN = exports.TXT_NOT_A_FUNC_s_IS_TYPE_s = exports.TXT_NONTERMINATED_STRING = exports.TXT_NON_CONST_METHOD_ON_CONST_OBJ = exports.TXT_NO_MATCHING_SYMBOL_s = exports.TXT_NO_MATCHING_OP_FOUND_FOR_TYPES_s_AND_s = exports.TXT_NO_MATCHING_OP_FOUND_FOR_TYPE_s = exports.TXT_NO_MATCHING_SIGNATURES_TO_s = void 0;
exports.TXT_DONT_SUPPORT_TYPE_s_BY_VAL = exports.TXT_CANNOT_RET_TYPE_s_BY_VAL = exports.TXT_CANNOT_PASS_TYPE_s_BY_VAL = exports.TXT_NON_POD_REQUIRE_CONSTR_DESTR_BEHAVIOUR = exports.TXT_REF_REQUIRE_ADD_REL_BEHAVIOUR = exports.TXT_SCOPE_REQUIRE_REL_BEHAVIOUR = exports.TXT_VALUE_GC_REQUIRE_GC_BEHAVIOUR = exports.TXT_GC_REQUIRE_ADD_REL_GC_BEHAVIOUR = exports.TXT_ILLEGAL_BEHAVIOUR_FOR_TYPE = exports.TXT_TYPE_s_IS_MISSING_BEHAVIOURS = exports.TXT_VALUE_TYPE_MUST_HAVE_SIZE = exports.TXT_INVALID_CONFIGURATION = exports.TXT_FIRST_PARAM_MUST_BE_REF_FOR_TEMPLATE_FACTORY = exports.TXT_AUTOHANDLE_CANNOT_BE_USED_FOR_NOCOUNT = exports.TXT_EXCEPTION_s_IN_s = exports.TXT_FAILED_TO_INITIALIZE_s = exports.TXT_WHILE_INCLUDING_MIXIN = exports.TXT_WHILE_PARSING_STATEMENT_BLOCK = exports.TXT_WHILE_PARSING_NAMESPACE = exports.TXT_WHILE_PARSING_INIT_LIST = exports.TXT_WHILE_PARSING_EXPRESSION = exports.TXT_WHILE_PARSING_ARG_LIST = exports.TXT_WHERE_s_IS_s = exports.TXT_WARNINGS_TREATED_AS_ERROR = exports.TXT_VOID_CANT_BE_OPERAND = exports.TXT_VALUE_TOO_LARGE_FOR_TYPE = exports.TXT_UNUSED_SCRIPT_NODE = exports.TXT_UNRECOGNIZED_VIRTUAL_PROPERTY_NODE = exports.TXT_UNREACHABLE_CODE = exports.TXT_UNKNOWN_SCOPE_s = exports.TXT_UNINITIALIZED_GLOBAL_VAR_s = exports.TXT_UNEXPECTED_VAR_DECL = exports.TXT_UNEXPECTED_TOKEN_s = exports.TXT_UNEXPECTED_END_OF_FILE = exports.TXT_TYPE_s_NOT_TEMPLATE = exports.TXT_TYPE_s_NOT_AVAILABLE_FOR_MODULE = exports.TXT_TYPE_s_CANNOT_BE_REFERENCE = exports.TXT_TOO_MANY_VALUES_FOR_LIST = exports.TXT_TOO_MANY_JUMP_LABELS = exports.TXT_TMPL_SUBTYPE_MUST_NOT_BE_READ_ONLY = exports.TXT_TMPL_s_EXPECTS_d_SUBTYPES = exports.TXT_SWITCH_MUST_BE_INTEGRAL = exports.TXT_SWITCH_CASE_MUST_BE_CONSTANT = exports.TXT_STRINGS_NOT_RECOGNIZED = exports.TXT_SIGNED_UNSIGNED_MISMATCH = exports.TXT_SECTION_IS_EMPTY = exports.TXT_SHARED_s_DOESNT_MATCH_ORIGINAL = exports.TXT_SHARED_CANNOT_USE_NON_SHARED_TYPE_s = exports.TXT_SHARED_CANNOT_INHERIT_FROM_NON_SHARED_s = exports.TXT_SHARED_CANNOT_IMPLEMENT_NON_SHARED_s = void 0;
exports.TXT_TOO_MANY_NESTED_CALLS = exports.TXT_MISMATCH_IN_VALUE_ASSIGN = exports.TXT_EXCEPTION_CAUGHT = exports.TXT_OUT_OF_BOUNDS = exports.TXT_UNBOUND_FUNCTION = exports.TXT_INVALID_CALLING_CONVENTION = exports.TXT_UNRECOGNIZED_BYTE_CODE = exports.TXT_POW_OVERFLOW = exports.TXT_DIVIDE_OVERFLOW = exports.TXT_DIVIDE_BY_ZERO = exports.TXT_NULL_POINTER_ACCESS = exports.TXT_STACK_OVERFLOW = exports.TXT_VARIABLE_DECL = exports.TXT_SYSTEM_FUNCTION = exports.TXT_PROPERTY = exports.TXT_EXTRNL_REF_TO_MODULE_s = exports.TXT_MODULE_IS_IN_USE = exports.TXT_ENGINE_REF_COUNT_ERROR_DURING_SHUTDOWN = exports.TXT_NO_JIT_IN_FUNC_s = exports.TXT_INVALID_BYTECODE_d = exports.TXT_RESURRECTING_SCRIPTOBJECT_s = exports.TXT_PREV_FUNC_IS_NAMED_s_TYPE_IS_d = exports.TXT_PREV_TYPE_IS_NAMED_s = exports.TXT_TYPE_s_IS_STILL_USED_BY_FUNC_s = exports.TXT_EXCEPTION_IN_NESTED_CALL = exports.TXT_GC_RECEIVED_NULL_PTR = exports.TXT_FAILED_IN_FUNC_s_WITH_s_AND_s_s_d = exports.TXT_FAILED_IN_FUNC_s_WITH_s_s_d = exports.TXT_FAILED_IN_FUNC_s_s_d = exports.TXT_FAILED_READ_SUBTYPE_OF_TEMPLATE_s = exports.TXT_LIST_FACTORY_EXPECTS_1_REF_PARAM = exports.TXT_TEMPLATE_LIST_FACTORY_EXPECTS_2_REF_PARAMS = exports.TXT_TEMPLATE_SUBTYPE_s_DOESNT_EXIST = exports.TXT_TEMPLATE_TYPE_s_DOESNT_EXIST = exports.TXT_TEMPLATE_s_ALREADY_GENERATED_CANT_REGISTER = exports.TXT_OBJECT_TYPE_s_DOESNT_EXIST = exports.TXT_d_GC_CANNOT_FREE_OBJ_OF_TYPE_s_REF_COUNT_d = exports.TXT_d_GC_CANNOT_FREE_OBJ_OF_TYPE_s = exports.TXT_DONT_SUPPORT_RET_TYPE_s_BY_VAL = void 0;
exports.TXT_s_ALREADY_DECLARED = "'%s' is already declared";
exports.TXT_ABSTRACT_CLASS_s_CANNOT_BE_INSTANTIATED = "Abstract class '%s' cannot be instantiated";
exports.TXT_ACCESSING_PRIVATE_PROP_s = "Accessing private property '%s' of parent class";
exports.TXT_ARG_NOT_LVALUE = 'Output argument expression is not assignable';
exports.TXT_ATTR_s_INFORMED_MULTIPLE_TIMES = "Attribute '%s' informed multiple times";
exports.TXT_AUTO_NOT_ALLOWED = 'Auto is not allowed here';
exports.TXT_BOTH_MUST_BE_SAME = 'Both expressions must have the same type';
exports.TXT_BOTH_CONDITIONS_MUST_CALL_CONSTRUCTOR = 'Both conditions must call constructor';
exports.TEXT_BASE_DOESNT_HAVE_DEF_CONSTR = "Base class doesn't have default constructor. Make explicit call to base constructor";
exports.TXT_CANDIDATES_ARE = 'Candidates are:';
exports.TXT_CANNOT_CALL_CONSTRUCTOR_IN_LOOPS = "Can't call a constructor in loops";
exports.TXT_CANNOT_CALL_CONSTRUCTOR_IN_SWITCH = "Can't call a constructor in switch";
exports.TXT_CANNOT_CALL_CONSTRUCTOR_TWICE = "Can't call a constructor multiple times";
exports.TXT_CANNOT_CREATE_DELEGATE_FOR_NOREF_TYPES = "Can't create delegate for types that do not support handles";
exports.TXT_CANNOT_IMPLEMENT_SELF = "Can't implement itself, or another interface that implements this interface";
exports.TXT_CANNOT_INHERIT_FROM_s_FINAL = "Can't inherit from class '%s' marked as final";
exports.TXT_CANNOT_INHERIT_FROM_MULTIPLE_CLASSES = "Can't inherit from multiple classes";
exports.TXT_CANNOT_INHERIT_FROM_SELF = "Can't inherit from itself, or another class that inherits from this class";
exports.TXT_CANNOT_PASS_CLASS_METHOD_AS_ARG = "Can't pass class method as arg directly. Use a delegate object instead";
exports.TXT_CANNOT_RESOLVE_AUTO = 'Unable to resolve auto type';
exports.TXT_CANNOT_ACCESS_NON_STATIC_MEMBER_s = "Cannot access non-static member '%s' like this";
exports.TXT_CANNOT_RETURN_REF_TO_LOCAL = "Can't return reference to local value.";
exports.TXT_CANT_CONSTRUCT_s_USE_REF_CAST = "Can't construct handle '%s'. Use ref cast instead";
exports.TXT_CANT_IMPLICITLY_CONVERT_s_TO_s = "Can't implicitly convert from '%s' to '%s'.";
exports.TXT_CANT_RETURN_VALUE = "Can't return value when return type is 'void'";
exports.TXT_CHANGE_SIGN = 'Implicit conversion changed sign of value';
exports.TXT_CLASS_CANT_BE_FINAL_AND_ABSTRACT = 'A class cannot be both abstract and final';
exports.TXT_COMPILING_s = 'Compiling %s';
exports.TXT_COMPOUND_ASGN_ON_VALUE_TYPE = 'Compound assignments with property accessors on value types are not supported';
exports.TXT_COMPOUND_ASGN_WITH_IDX_PROP = 'Compound assignments with indexed property accessors are not supported';
exports.TXT_COMPOUND_ASGN_REQUIRE_GET_SET = 'Compound assignments with property accessors require both get and set accessors';
exports.TXT_PROP_ACCESS_s_DOES_NOT_EXPECT_INDEX = "Implemented property accessor '%s' does not expect index argument";
exports.TXT_PROP_ACCESS_s_EXPECTS_INDEX = "Implemented property accessor '%s' expects index argument";
exports.TXT_DATA_TYPE_CANT_BE_s = "Data type can't be '%s'";
exports.TXT_DECL_IN_SWITCH = 'Variables cannot be declared in switch cases, except inside statement blocks';
exports.TXT_DEFAULT_MUST_BE_LAST = 'The default case must be the last one';
exports.TXT_DEF_ARG_MISSING_IN_FUNC_s = "All subsequent parameters after the first default value must have default values in function '%s'";
exports.TXT_DEF_ARG_TYPE_DOESNT_MATCH = "The type of the default argument expression doesn't match the function parameter type";
exports.TXT_DUPLICATE_NAMED_ARG = 'Duplicate named argument';
exports.TXT_DERIVED_METHOD_MUST_HAVE_SAME_RETTYPE_s = "The method in the derived class must have the same return type as in the base class: '%s'";
exports.TXT_DESTRUCTOR_MAY_NOT_HAVE_PARM = 'The destructor must not have any parameters';
exports.TXT_DESTRUCTOR_s_s_NAME_ERROR = "The name of the destructor '%s::~%s' must be the same as the class";
exports.TXT_DISALLOW_ASSIGN_ON_REF_TYPE = 'Value assignment on reference types is not allowed. Did you mean to do a handle assignment?';
exports.TXT_DISALLOW_COMPOUND_ASSIGN_ON_REF_TYPE = 'Compound assignment on reference types is not allowed';
exports.TXT_DUPLICATE_SWITCH_CASE = 'Duplicate switch case';
exports.TXT_ELSE_WITH_EMPTY_STATEMENT = 'Else with empty statement';
exports.TXT_EMPTY_LIST_ELEMENT_IS_NOT_ALLOWED = 'Empty list element is not allowed';
exports.TXT_EMPTY_SWITCH = 'Empty switch statement';
exports.TXT_EXPECTED_s = "Expected '%s'";
exports.TXT_EXPECTED_CONSTANT = 'Expected constant';
exports.TXT_EXPECTED_DATA_TYPE = 'Expected data type';
exports.TXT_EXPECTED_EXPRESSION_VALUE = 'Expected expression value';
exports.TXT_EXPECTED_IDENTIFIER = 'Expected identifier';
exports.TXT_EXPECTED_LIST = 'Expected a list enclosed by { } to match pattern';
exports.TXT_EXPECTED_METHOD_OR_PROPERTY = 'Expected method or property';
exports.TXT_EXPECTED_ONE_OF = 'Expected one of: ';
exports.TXT_EXPECTED_OPERATOR = 'Expected operator';
exports.TXT_EXPECTED_s_OR_s = "Expected '%s' or '%s'";
exports.TXT_EXPECTED_POST_OPERATOR = 'Expected post operator';
exports.TXT_EXPECTED_PRE_OPERATOR = 'Expected pre operator';
exports.TXT_EXPECTED_STRING = 'Expected string';
exports.TXT_EXPR_DOESNT_EVAL_TO_FUNC = "Expression doesn't evaluate to a function";
exports.TXT_EXPR_MUST_BE_BOOL = 'Expression must be of boolean type';
exports.TXT_EXPR_s_IS_DATA_TYPE = "Expression '%s' is a data type";
exports.TXT_EXTERNAL_SHARED_s_NOT_FOUND = "External shared entity '%s' not found";
exports.TXT_EXTERNAL_SHARED_s_CANNOT_REDEF = "External shared entity '%s' cannot redefine the original entity";
exports.TXT_FAILED_TO_COMPILE_DEF_ARG_d_IN_FUNC_s = "Failed while compiling default arg for parameter %d in function '%s'";
exports.TXT_FAILED_TO_CREATE_TEMP_OBJ = 'Previous error occurred while attempting to create a temporary copy of object';
exports.TXT_FLOAT_CONV_TO_INT_CAUSE_TRUNC = 'Float value truncated in implicit conversion to integer';
exports.TXT_FOUND_MULTIPLE_ENUM_VALUES = 'Found multiple matching enum values';
exports.TXT_FUNCTION_ALREADY_EXIST = 'A function with the same name and parameters already exists';
exports.TXT_FUNCTION_s_NOT_FOUND = "Function '%s' not found";
exports.TXT_GET_SET_ACCESSOR_TYPE_MISMATCH_FOR_s = "The property '%s' has mismatching types for the get and set accessors";
exports.TXT_GLOBAL_VARS_NOT_ALLOWED = 'Global variables have been disabled by the application';
exports.TXT_HANDLE_ASSIGN_ON_NON_HANDLE_PROP = 'It is not allowed to perform a handle assignment on a non-handle property';
exports.TXT_HANDLE_COMPARISON = 'The operand is implicitly converted to handle in order to compare them';
exports.TXT_HANDLE_OF_HANDLE_IS_NOT_ALLOWED = 'Handle to handle is not allowed';
exports.TXT_s_HIDES_VAR_IN_OUTER_SCOPE = "Variable '%s' hides another variable of same name in outer scope";
exports.TXT_IDENTIFIER_s_NOT_DATA_TYPE = "Identifier '%s' is not a data type";
exports.TXT_IDENTIFIER_s_NOT_DATA_TYPE_IN_GLOBAL_NS = "Identifier '%s' is not a data type in global namespace";
exports.TXT_IDENTIFIER_s_NOT_DATA_TYPE_IN_NS_s = "Identifier '%s' is not a data type in namespace '%s' or parent";
exports.TXT_IF_WITH_EMPTY_STATEMENT = 'If with empty statement';
exports.TXT_ILLEGAL_MEMBER_TYPE = 'Illegal member type';
// TODO: Should be TXT_ILLEGAL_OPERATION_ON_s
exports.TXT_ILLEGAL_OPERATION = 'Illegal operation on this datatype';
exports.TXT_ILLEGAL_OPERATION_ON_s = "Illegal operation on '%s'";
exports.TXT_ILLEGAL_TARGET_TYPE_FOR_REF_CAST = 'Illegal target type for reference cast';
exports.TXT_ILLEGAL_VARIABLE_NAME_s = "Illegal variable name '%s'.";
exports.TXT_INHERITED_PRIVATE_PROP_ACCESS_s = "Illegal access to inherited private property '%s'";
exports.TXT_INIT_LIST_CANNOT_BE_USED_WITH_s = "Initialization lists cannot be used with '%s'";
exports.TXT_INSTANCING_INVLD_TMPL_TYPE_s_s = "Attempting to instantiate invalid template type '%s<%s>'";
exports.TXT_INSTEAD_FOUND_s = "Instead found '%s'";
exports.TXT_INSTEAD_FOUND_IDENTIFIER_s = "Instead found identifier '%s'";
exports.TXT_INSTEAD_FOUND_KEYWORD_s = "Instead found reserved keyword '%s'";
exports.TXT_INTERFACE_s_CANNOT_BE_INSTANTIATED = "Interface '%s' cannot be instantiated";
exports.TXT_INTERFACE_CAN_ONLY_IMPLEMENT_INTERFACE = 'Interfaces can only implement other interfaces';
exports.TXT_INVALID_BREAK = "Invalid 'break'";
exports.TXT_INVALID_CHAR_LITERAL = 'Invalid character literal';
exports.TXT_INVALID_CONTINUE = "Invalid 'continue'";
exports.TXT_INVALID_ESCAPE_SEQUENCE = 'Invalid escape sequence';
exports.TXT_INVALID_EXPRESSION_AMBIGUOUS_NAME = 'Invalid expression: ambiguous name';
exports.TXT_INVALID_EXPRESSION_LAMBDA = 'Invalid expression: stand-alone anonymous function';
exports.TXT_INVALID_OP_ON_METHOD = 'Invalid operation on method';
exports.TXT_INVALID_REF_PROP_ACCESS = 'Invalid reference. Property accessors cannot be used in combined read/write operations';
exports.TXT_INVALID_SCOPE = 'Invalid scope resolution';
exports.TXT_INVALID_SIG_FOR_VIRTPROP = 'Invalid signature for virtual property';
exports.TXT_INVALID_TYPE = 'Invalid type';
exports.TXT_INVALID_UNICODE_FORMAT_EXPECTED_d = 'Invalid unicode escape sequence, expected %d hex digits';
exports.TXT_INVALID_UNICODE_VALUE = 'Invalid unicode code point';
exports.TXT_INVALID_UNICODE_SEQUENCE_IN_SRC = 'Invalid unicode sequence in source';
exports.TXT_INVALID_USE_OF_NAMED_ARGS = 'Invalid use of named arguments';
exports.TXT_METHOD_CANNOT_OVERRIDE_s = "Method '%s' declared as final and cannot be overridden";
exports.TXT_METHOD_CANT_HAVE_NAME_OF_CLASS = 'The method cannot be named with the class name';
exports.TXT_METHOD_s_DOES_NOT_OVERRIDE = "Method '%s' marked as override but does not replace any base class or interface method";
exports.TXT_METHOD_s_s_HAS_NO_RETURN_TYPE = "Method '%s::%s' is missing the return type, nor is it the same name as object to be a constructor";
exports.TXT_METHOD_s_NOT_PART_OF_OBJECT_s = "Method '%s' is not part of object '%s'";
exports.TXT_MISSING_IMPLEMENTATION_OF_s = "Missing implementation of '%s'";
exports.TXT_MISSING_DEFINITION_OF_s = "Missing definition of '%s'";
exports.TXT_MIXIN_CANNOT_BE_DECLARED_AS_s = "Mixin class cannot be declared as '%s'";
exports.TXT_MIXIN_CANNOT_HAVE_CONSTRUCTOR = 'Mixin classes cannot have constructors or destructors';
exports.TXT_MIXIN_CLASS_CANNOT_INHERIT = 'Mixin class cannot inherit from classes';
exports.TXT_MIXIN_CANNOT_HAVE_CHILD_TYPES = 'Mixin classes cannot have child types';
exports.TXT_MORE_THAN_ONE_MATCHING_OP = 'Found more than one matching operator';
exports.TXT_MULTIPLE_MATCHING_SIGNATURES_TO_s = "Multiple matching signatures to '%s'";
exports.TXT_MULTIPLE_PROP_GET_ACCESSOR_FOR_s = "Found multiple get accessors for property '%s'";
exports.TXT_MULTIPLE_PROP_SET_ACCESSOR_FOR_s = "Found multiple set accessors for property '%s'";
exports.TXT_MULTILINE_STRINGS_NOT_ALLOWED = 'Multiline strings are not allowed in this application';
exports.TXT_MUST_BE_OBJECT = 'Only objects have constructors';
exports.TXT_MUST_RETURN_VALUE = 'Must return a value';
exports.TXT_NAMESPACE_s_DOESNT_EXIST = "Namespace '%s' doesn't exist.";
exports.TXT_NAME_CONFLICT_s_EXTENDED_TYPE = "Name conflict. '%s' is an extended data type.";
exports.TXT_NAME_CONFLICT_s_GLOBAL_PROPERTY = "Name conflict. '%s' is a global property.";
exports.TXT_NAME_CONFLICT_s_IS_NAMED_TYPE = "Name conflict. '%s' is a named type.";
exports.TXT_NAME_CONFLICT_s_IS_FUNCDEF = "Name conflict. '%s' is a funcdef.";
exports.TXT_NAME_CONFLICT_s_IS_FUNCTION = "Name conflict. '%s' is a global function.";
exports.TXT_NAME_CONFLICT_s_IS_MIXIN = "Name conflict. '%s' is a mixin class.";
exports.TXT_NAME_CONFLICT_s_IS_VIRTPROP = "Name conflict. '%s' is a virtual property.";
exports.TXT_NAME_CONFLICT_s_STRUCT = "Name conflict. '%s' is a class.";
exports.TXT_NAME_CONFLICT_s_OBJ_PROPERTY = "Name conflict. '%s' is an object property.";
exports.TXT_NAME_CONFLICT_s_METHOD = "Name conflict. '%s' is a class method.";
exports.TXT_NAME_CONFLICT_s_ALREADY_USED = "Name conflict. '%s' is already used.";
exports.TXT_NAMED_ARGS_WITH_OLD_SYNTAX = 'Detected named argument with old syntax';
exports.TXT_NO_APPROPRIATE_INDEX_OPERATOR = 'No appropriate indexing operator found';
exports.TXT_NO_APPROPRIATE_OPHNDLASSIGN_s = "No appropriate opHndlAssign method found in '%s' for handle assignment";
exports.TXT_NO_APPROPRIATE_OPEQUALS = 'No appropriate opEquals method found';
exports.TXT_NO_CONVERSION_s_TO_s = "No conversion from '%s' to '%s' available.";
exports.TXT_NO_CONVERSION_s_TO_MATH_TYPE = "No conversion from '%s' to math type available.";
exports.TXT_NO_DEFAULT_ARRAY_TYPE = "The application doesn't support the default array type.";
exports.TXT_NO_DEFAULT_CONSTRUCTOR_FOR_s = "No default constructor for object of type '%s'.";
exports.TXT_NO_DEFAULT_COPY_OP_FOR_s = "No appropriate opAssign method found in '%s' for value assignment";
exports.TXT_NO_COPY_CONSTRUCTOR_FOR_s = "No copy constructor for object of type '%s'.";
exports.TXT_NO_MATCHING_SIGNATURES_TO_s = "No matching signatures to '%s'";
exports.TXT_NO_MATCHING_OP_FOUND_FOR_TYPE_s = "No matching operator that takes the type '%s' found";
exports.TXT_NO_MATCHING_OP_FOUND_FOR_TYPES_s_AND_s = "No matching operator that takes the types '%s' and '%s' found";
exports.TXT_NO_MATCHING_SYMBOL_s = "No matching symbol '%s'";
exports.TXT_NON_CONST_METHOD_ON_CONST_OBJ = 'Non-const method call on read-only object reference';
exports.TXT_NONTERMINATED_STRING = 'Non-terminated string literal';
exports.TXT_NOT_A_FUNC_s_IS_TYPE_s = "Expression doesn't form a function call. '%s' evaluates to the non-function type '%s'";
exports.TXT_NOT_ALL_PATHS_RETURN = 'Not all paths return a value';
exports.TXT_NOT_ENOUGH_VALUES_FOR_LIST = 'Not enough values to match pattern';
exports.TXT_s_NOT_DECLARED = "'%s' is not declared";
exports.TXT_NOT_EXACT = 'Implicit conversion of value is not exact';
exports.TXT_s_NOT_INITIALIZED = "'%s' is not initialized.";
exports.TXT_NOT_LVALUE = 'Expression is not an l-value';
exports.TXT_s_NOT_MEMBER_OF_s = "'%s' is not a member of '%s'";
exports.TXT_NOT_VALID_REFERENCE = 'Not a valid reference';
exports.TXT_NOT_VALID_LVALUE = 'Not a valid lvalue';
exports.TXT_NOTHING_WAS_BUILT = 'Nothing was built in the module';
exports.TXT_OBJECT_DOESNT_SUPPORT_INDEX_OP = "Type '%s' doesn't support the indexing operator";
exports.TXT_OBJECT_HANDLE_NOT_SUPPORTED = 'Object handle is not supported for this type';
exports.TXT_ONLY_OBJECTS_MAY_USE_REF_INOUT = 'Only object types that support object handles can use &inout. Use &in or &out instead';
exports.TXT_ONLY_ONE_ARGUMENT_IN_CAST = 'A cast operator has one argument';
exports.TXT_ONLY_ONE_FUNCTION_ALLOWED = 'The code must contain one and only one function';
exports.TXT_ONLY_ONE_VARIABLE_ALLOWED = 'The code must contain one and only one global variable';
exports.TXT_OPERANDS_MUST_BE_HANDLES = 'Both operands must be handles when comparing identity';
exports.TXT_OVERLOAD_CONFLICTS_DUE_TO_DEFAULT_ARGS = 'The overloaded functions are identical on initial parameters without default arguments';
exports.TXT_PARAMETER_ALREADY_DECLARED = 'Parameter already declared';
exports.TXT_PARAMETER_CANT_BE_s = "Parameter type can't be '%s', because the type cannot be instantiated.";
exports.TXT_POS_ARG_AFTER_NAMED_ARG = 'Positional arguments cannot be passed after named arguments';
exports.TXT_PREV_ERROR_WHILE_COMP_LIST_FOR_TYPE_s = "Previous error occurred while attempting to compile initialization list for type '%s'";
exports.TXT_PRIVATE_METHOD_CALL_s = "Illegal call to private method '%s'";
exports.TXT_PRIVATE_PROP_ACCESS_s = "Illegal access to private property '%s'";
exports.TXT_PROTECTED_METHOD_CALL_s = "Illegal call to protected method '%s'";
exports.TXT_PROTECTED_PROP_ACCESS_s = "Illegal access to protected property '%s'";
exports.TXT_PROP_ACCESS_WITH_INDEX_ONE_ARG = 'Property accessor with index must have 1 and only 1 index argument';
exports.TXT_PROPERTY_ACCESSOR_DISABLED = 'Property accessors have been disabled by the application';
exports.TXT_PROPERTY_ACCESSOR_MUST_BE_IMPLEMENTED = 'Property accessor must be implemented';
exports.TXT_PROPERTY_CANT_BE_CONST = 'Class properties cannot be declared as const';
exports.TXT_PROPERTY_HAS_NO_GET_ACCESSOR = 'The property has no get accessor';
exports.TXT_PROPERTY_HAS_NO_SET_ACCESSOR = 'The property has no set accessor';
exports.TXT_PROPERTY_WITHOUT_ACCESSOR = 'Virtual property must have at least one get or set accessor';
exports.TXT_REF_CANT_BE_TO_LOCAL_VAR = 'Resulting reference cannot be returned. Returned references must not refer to local variables.';
exports.TXT_REF_CANT_BE_RETURNED_DEFERRED_PARAM = 'Resulting reference cannot be returned. There are deferred arguments that may invalidate it.';
exports.TXT_REF_CANT_BE_RETURNED_LOCAL_VARS = 'Resulting reference cannot be returned. The expression uses objects that during cleanup may invalidate it.';
exports.TXT_REF_IS_READ_ONLY = 'Reference is read-only';
exports.TXT_REF_IS_TEMP = 'Reference is temporary';
exports.TXT_REF_TYPE_CANT_BE_PASSED_BY_VAL = 'Reference types cannot be passed by value in function parameters';
exports.TXT_REF_TYPE_CANT_BE_RETURNED_BY_VAL = 'Reference types cannot be returned by value from functions';
exports.TXT_RETURN_CANT_BE_s = "Return type can't be '%s'";
exports.TXT_SHARED_CANNOT_ACCESS_NON_SHARED_VAR_s = "Shared code cannot access non-shared global variable '%s'";
exports.TXT_SHARED_CANNOT_CALL_NON_SHARED_FUNC_s = "Shared code cannot call non-shared function '%s'";
exports.TXT_SHARED_CANNOT_IMPLEMENT_NON_SHARED_s = "Shared type cannot implement non-shared interface '%s'";
exports.TXT_SHARED_CANNOT_INHERIT_FROM_NON_SHARED_s = "Shared class cannot inherit from non-shared class '%s'";
exports.TXT_SHARED_CANNOT_USE_NON_SHARED_TYPE_s = "Shared code cannot use non-shared type '%s'";
exports.TXT_SHARED_s_DOESNT_MATCH_ORIGINAL = "Shared type '%s' doesn't match the original declaration in other module";
exports.TXT_SECTION_IS_EMPTY = 'The script section is empty';
exports.TXT_SIGNED_UNSIGNED_MISMATCH = 'Signed/Unsigned mismatch';
exports.TXT_STRINGS_NOT_RECOGNIZED = 'Strings are not recognized by the application';
exports.TXT_SWITCH_CASE_MUST_BE_CONSTANT = 'Case expressions must be constants';
exports.TXT_SWITCH_MUST_BE_INTEGRAL = 'Switch expressions must be integral numbers';
exports.TXT_TMPL_s_EXPECTS_d_SUBTYPES = "Template '%s' expects %d sub type(s)";
exports.TXT_TMPL_SUBTYPE_MUST_NOT_BE_READ_ONLY = 'Template subtype must not be read-only';
exports.TXT_TOO_MANY_JUMP_LABELS = 'The function has too many jump labels to handle. Split the function into smaller ones.';
exports.TXT_TOO_MANY_VALUES_FOR_LIST = 'Too many values to match pattern';
exports.TXT_TYPE_s_CANNOT_BE_REFERENCE = "Type '%s' cannot be a reference";
exports.TXT_TYPE_s_NOT_AVAILABLE_FOR_MODULE = "Type '%s' is not available for this module";
exports.TXT_TYPE_s_NOT_TEMPLATE = "Type '%s' is not a template type";
exports.TXT_UNEXPECTED_END_OF_FILE = 'Unexpected end of file';
exports.TXT_UNEXPECTED_TOKEN_s = "Unexpected token '%s'";
exports.TXT_UNEXPECTED_VAR_DECL = 'Unexpected variable declaration';
exports.TXT_UNINITIALIZED_GLOBAL_VAR_s = "Use of uninitialized global variable '%s'.";
exports.TXT_UNKNOWN_SCOPE_s = "Unknown scope '%s'";
exports.TXT_UNREACHABLE_CODE = 'Unreachable code';
exports.TXT_UNRECOGNIZED_VIRTUAL_PROPERTY_NODE = 'Virtual property contains unrecognized aspect';
exports.TXT_UNUSED_SCRIPT_NODE = 'Unused script node';
exports.TXT_VALUE_TOO_LARGE_FOR_TYPE = 'Value is too large for data type';
exports.TXT_VOID_CANT_BE_OPERAND = 'Void cannot be an operand in expressions';
exports.TXT_WARNINGS_TREATED_AS_ERROR = 'Warnings are treated as errors by the application';
exports.TXT_WHERE_s_IS_s = "Where '%s' is '%s'";
exports.TXT_WHILE_PARSING_ARG_LIST = 'While parsing argument list';
exports.TXT_WHILE_PARSING_EXPRESSION = 'While parsing expression';
exports.TXT_WHILE_PARSING_INIT_LIST = 'While parsing initialization list';
exports.TXT_WHILE_PARSING_NAMESPACE = 'While parsing namespace';
exports.TXT_WHILE_PARSING_STATEMENT_BLOCK = 'While parsing statement block';
exports.TXT_WHILE_INCLUDING_MIXIN = 'Previous error occurred while including mixin';
// Global variable initialization
exports.TXT_FAILED_TO_INITIALIZE_s = "Failed to initialize global variable '%s'";
exports.TXT_EXCEPTION_s_IN_s = "Exception '%s' in '%s'";
// Engine message
exports.TXT_AUTOHANDLE_CANNOT_BE_USED_FOR_NOCOUNT = 'Autohandles cannot be used with types that have been registered with NOCOUNT';
exports.TXT_FIRST_PARAM_MUST_BE_REF_FOR_TEMPLATE_FACTORY = 'First parameter to template factory must be a reference. This will be used to pass the object type of the template';
exports.TXT_INVALID_CONFIGURATION = 'Invalid configuration. Verify the registered application interface.';
exports.TXT_VALUE_TYPE_MUST_HAVE_SIZE = 'A value type must be registered with a non-zero size';
exports.TXT_TYPE_s_IS_MISSING_BEHAVIOURS = "Type '%s' is missing behaviours";
exports.TXT_ILLEGAL_BEHAVIOUR_FOR_TYPE = 'The behaviour is not compatible with the type';
exports.TXT_GC_REQUIRE_ADD_REL_GC_BEHAVIOUR = 'A garbage collected ref type must have the addref, release, and all gc behaviours';
exports.TXT_VALUE_GC_REQUIRE_GC_BEHAVIOUR = 'A garbage collected value type must have the gc enum references behaviour';
exports.TXT_SCOPE_REQUIRE_REL_BEHAVIOUR = 'A scoped reference type must have the release behaviour';
exports.TXT_REF_REQUIRE_ADD_REL_BEHAVIOUR = 'A reference type must have the addref and release behaviours';
exports.TXT_NON_POD_REQUIRE_CONSTR_DESTR_BEHAVIOUR = 'A non-pod value type must have at least one constructor and the destructor behaviours';
exports.TXT_CANNOT_PASS_TYPE_s_BY_VAL = "Can't pass type '%s' by value unless the application type is informed in the registration";
exports.TXT_CANNOT_RET_TYPE_s_BY_VAL = "Can't return type '%s' by value unless the application type is informed in the registration";
// TODO: Should be something like "This platform requires that AngelScript knows the exact content of the type '%s' in order to pass by value to application in native calling convention";
exports.TXT_DONT_SUPPORT_TYPE_s_BY_VAL = "Don't support passing type '%s' by value to application in native calling convention on this platform";
// TODO: Should be something like "This platform requires that AngelScript knows the exact content of the type '%s' in order to return by value from application in native calling convention";
exports.TXT_DONT_SUPPORT_RET_TYPE_s_BY_VAL = "Don't support returning type '%s' by value from application in native calling convention on this platform";
exports.TXT_d_GC_CANNOT_FREE_OBJ_OF_TYPE_s = "Object {%d}. GC cannot destroy an object of type '%s' as it doesn't know how many references to there are.";
exports.TXT_d_GC_CANNOT_FREE_OBJ_OF_TYPE_s_REF_COUNT_d = "Object {%d}. GC cannot destroy an object of type '%s' as it can't see all references. Current ref count is %d.";
exports.TXT_OBJECT_TYPE_s_DOESNT_EXIST = "Object type '%s' doesn't exist";
exports.TXT_TEMPLATE_s_ALREADY_GENERATED_CANT_REGISTER = "Cannot register. The template type instance '%s' has already been generated.";
exports.TXT_TEMPLATE_TYPE_s_DOESNT_EXIST = "Template type '%s' doesn't exist";
exports.TXT_TEMPLATE_SUBTYPE_s_DOESNT_EXIST = "Template subtype '%s' doesn't exist";
exports.TXT_TEMPLATE_LIST_FACTORY_EXPECTS_2_REF_PARAMS = 'Template list factory expects two reference parameters. The last is the pointer to the initialization buffer';
exports.TXT_LIST_FACTORY_EXPECTS_1_REF_PARAM = 'List factory expects only one reference parameter. The pointer to the initialization buffer will be passed in this parameter';
exports.TXT_FAILED_READ_SUBTYPE_OF_TEMPLATE_s = "Failed to read subtype of template type '%s'";
exports.TXT_FAILED_IN_FUNC_s_s_d = "Failed in call to function '%s' (Code: %s, %d)";
exports.TXT_FAILED_IN_FUNC_s_WITH_s_s_d = "Failed in call to function '%s' with '%s' (Code: %s, %d)";
exports.TXT_FAILED_IN_FUNC_s_WITH_s_AND_s_s_d = "Failed in call to function '%s' with '%s' and '%s' (Code: %s, %d)";
exports.TXT_GC_RECEIVED_NULL_PTR = 'AddScriptObjectToGC called with null pointer';
exports.TXT_EXCEPTION_IN_NESTED_CALL = 'An exception occurred in a nested call';
exports.TXT_TYPE_s_IS_STILL_USED_BY_FUNC_s = "Type '%s' is still used by function '%s'";
exports.TXT_PREV_TYPE_IS_NAMED_s = "The builtin type in previous message is named '%s'";
exports.TXT_PREV_FUNC_IS_NAMED_s_TYPE_IS_d = "The function in previous message is named '%s'. The func type is %d";
exports.TXT_RESURRECTING_SCRIPTOBJECT_s = "The script object of type '%s' is being resurrected illegally during destruction";
exports.TXT_INVALID_BYTECODE_d = 'LoadByteCode failed. The bytecode is invalid. Number of bytes read from stream: %d';
exports.TXT_NO_JIT_IN_FUNC_s = "Function '%s' appears to have been compiled without JIT entry points";
exports.TXT_ENGINE_REF_COUNT_ERROR_DURING_SHUTDOWN = "Uh oh! The engine's reference count is increasing while it is being destroyed. Make sure references needed for clean-up are immediately released";
exports.TXT_MODULE_IS_IN_USE = 'The module is still in use and cannot be rebuilt. Discard it and request another module';
exports.TXT_EXTRNL_REF_TO_MODULE_s = "There is an external reference to an object in module '%s', preventing it from being deleted";
// Internal names
exports.TXT_PROPERTY = 'Property';
exports.TXT_SYSTEM_FUNCTION = 'System function';
exports.TXT_VARIABLE_DECL = 'Variable declaration';
// Exceptions
exports.TXT_STACK_OVERFLOW = 'Stack overflow';
exports.TXT_NULL_POINTER_ACCESS = 'Null pointer access';
exports.TXT_DIVIDE_BY_ZERO = 'Divide by zero';
exports.TXT_DIVIDE_OVERFLOW = 'Overflow in integer division';
exports.TXT_POW_OVERFLOW = 'Overflow in exponent operation';
exports.TXT_UNRECOGNIZED_BYTE_CODE = 'Unrecognized byte code';
exports.TXT_INVALID_CALLING_CONVENTION = 'Invalid calling convention';
exports.TXT_UNBOUND_FUNCTION = 'Unbound function called';
exports.TXT_OUT_OF_BOUNDS = 'Out of range';
exports.TXT_EXCEPTION_CAUGHT = 'Caught an exception from the application';
exports.TXT_MISMATCH_IN_VALUE_ASSIGN = 'Mismatching types in value assignment';
exports.TXT_TOO_MANY_NESTED_CALLS = 'Too many nested calls';

});

var angelscript = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.asETokenClass = void 0;
(function (asETokenClass) {
    asETokenClass[asETokenClass["asTC_UNKNOWN"] = 0] = "asTC_UNKNOWN";
    asETokenClass[asETokenClass["asTC_KEYWORD"] = 1] = "asTC_KEYWORD";
    asETokenClass[asETokenClass["asTC_VALUE"] = 2] = "asTC_VALUE";
    asETokenClass[asETokenClass["asTC_IDENTIFIER"] = 3] = "asTC_IDENTIFIER";
    asETokenClass[asETokenClass["asTC_COMMENT"] = 4] = "asTC_COMMENT";
    asETokenClass[asETokenClass["asTC_WHITESPACE"] = 5] = "asTC_WHITESPACE";
})(exports.asETokenClass || (exports.asETokenClass = {}));

});

var tokenizer = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCTokenizer = exports.Token = void 0;


class Token {
    constructor(tokenType, length, tokenClass) {
        this.tokenType = tokenType;
        this.length = length;
        this.tokenClass = tokenClass;
    }
}
exports.Token = Token;
class asCTokenizer {
    constructor() {
        this.keywordTable = new Map();
        tokendef.tokenWords.forEach((e) => {
            var _a;
            if (!this.keywordTable.has(e.word[0])) {
                this.keywordTable.set(e.word[0], []);
            }
            (_a = this.keywordTable.get(e.word[0])) === null || _a === void 0 ? void 0 : _a.push(e);
        });
        this.keywordTable.forEach((v, k, m) => {
            m.set(k, v.sort((a, b) => a.wordLength - b.wordLength).reverse());
        });
        console.log(this.keywordTable);
    }
    GetToken(source) {
        return this.ParseToken(source);
    }
    static GetDefinition(tokenType) {
        var _a;
        if (tokenType == tokendef.eTokenType.ttUnrecognizedToken)
            return '<unrecognized token>';
        if (tokenType == tokendef.eTokenType.ttEnd)
            return '<end of file>';
        if (tokenType == tokendef.eTokenType.ttWhiteSpace)
            return '<white space>';
        if (tokenType == tokendef.eTokenType.ttOnelineComment)
            return '<one line comment>';
        if (tokenType == tokendef.eTokenType.ttMultilineComment)
            return '<multiple lines comment>';
        if (tokenType == tokendef.eTokenType.ttIdentifier)
            return '<identifier>';
        if (tokenType == tokendef.eTokenType.ttIntConstant)
            return '<integer constant>';
        if (tokenType == tokendef.eTokenType.ttFloatConstant)
            return '<float constant>';
        if (tokenType == tokendef.eTokenType.ttDoubleConstant)
            return '<double constant>';
        if (tokenType == tokendef.eTokenType.ttStringConstant)
            return '<string constant>';
        if (tokenType == tokendef.eTokenType.ttMultilineStringConstant)
            return '<multiline string constant>';
        if (tokenType == tokendef.eTokenType.ttNonTerminatedStringConstant)
            return '<nonterminated string constant>';
        if (tokenType == tokendef.eTokenType.ttBitsConstant)
            return '<bits constant>';
        if (tokenType == tokendef.eTokenType.ttHeredocStringConstant)
            return '<heredoc string constant>';
        return ((_a = tokendef.tokenWords.find((e) => e.tokenType === tokenType)) === null || _a === void 0 ? void 0 : _a.word) || '';
    }
    ParseToken(source) {
        let tmp;
        if ((tmp = this.IsWhiteSpace(source)))
            return new Token(tmp.tokenType, tmp.length, angelscript.asETokenClass.asTC_WHITESPACE);
        if ((tmp = this.IsComment(source)))
            return new Token(tmp.tokenType, tmp.length, angelscript.asETokenClass.asTC_COMMENT);
        if ((tmp = this.IsConstant(source)))
            return new Token(tmp.tokenType, tmp.length, angelscript.asETokenClass.asTC_VALUE);
        if ((tmp = this.IsIdentifier(source)))
            return new Token(tmp.tokenType, tmp.length, angelscript.asETokenClass.asTC_IDENTIFIER);
        if ((tmp = this.IsKeyWord(source)))
            return new Token(tmp.tokenType, tmp.length, angelscript.asETokenClass.asTC_KEYWORD);
        // If none of the above this is an unrecognized token
        // We can find the length of the token by advancing
        // one step and trying to identify a token there
        return new Token(tokendef.eTokenType.ttUnrecognizedToken, 1, angelscript.asETokenClass.asTC_UNKNOWN);
    }
    IsWhiteSpace(source) {
        // Treat UTF8 byte-order-mark (EF BB BF) as whitespace
        if (source.length >= 1 && source[0] == '\uFEFF') {
            return {
                tokenType: tokendef.eTokenType.ttWhiteSpace,
                length: 1,
            };
        }
        // Group all other white space characters into one
        let n = 0;
        for (; n < source.length; n++) {
            let isWhiteSpace = false;
            if (tokendef.whiteSpace.includes(source[n])) {
                isWhiteSpace = true;
            }
            if (!isWhiteSpace)
                break;
        }
        if (n) {
            return {
                tokenType: tokendef.eTokenType.ttWhiteSpace,
                length: n,
            };
        }
        return null;
    }
    IsComment(source) {
        if (source.length < 2) {
            return null;
        }
        if (source[0] != '/') {
            return null;
        }
        if (source[1] == '/') {
            // One-line comment
            // Find the length
            let n = 2;
            for (; n < source.length; n++) {
                if (source[n] == '\n')
                    break;
            }
            return {
                tokenType: tokendef.eTokenType.ttOnelineComment,
                length: n < source.length ? n + 1 : n,
            };
        }
        if (source[1] == '*') {
            // Multi-line comment
            // Find the length
            let n = 2;
            for (; n < source.length - 1;) {
                if (source[n++] == '*' && source[n] == '/')
                    break;
            }
            return {
                tokenType: tokendef.eTokenType.ttMultilineComment,
                length: n + 1,
            };
        }
        return null;
    }
    IsConstant(source) {
        // Starting with number
        if ((source[0] >= '0' && source[0] <= '9') ||
            (source[0] == '.' &&
                source.length > 1 &&
                source[1] >= '0' &&
                source[1] <= '9')) {
            // Is it a based number?
            if (source[0] == '0' && source.length > 1) {
                // Determine the radix for the constant
                let radix = 0;
                switch (source[1]) {
                    case 'b':
                    case 'B':
                        radix = 2;
                        break;
                    case 'o':
                    case 'O':
                        radix = 8;
                        break;
                    case 'd':
                    case 'D':
                        radix = 10;
                        break;
                    case 'x':
                    case 'X':
                        radix = 16;
                        break;
                }
                if (radix) {
                    let n = 2;
                    for (; n < source.length; n++) {
                        if (!this.IsDigitInRadix(source[n], radix))
                            break;
                    }
                    return {
                        tokenType: tokendef.eTokenType.ttBitsConstant,
                        length: n,
                    };
                }
            }
            let n = 0;
            for (; n < source.length; n++) {
                if (source[n] < '0' || source[n] > '9')
                    break;
            }
            if (n < source.length &&
                (source[n] == '.' || source[n] == 'e' || source[n] == 'E')) {
                if (source[n] == '.') {
                    n++;
                    for (; n < source.length; n++) {
                        if (source[n] < '0' || source[n] > '9')
                            break;
                    }
                }
                if (n < source.length &&
                    (source[n] == 'e' || source[n] == 'E')) {
                    n++;
                    if (n < source.length &&
                        (source[n] == '-' || source[n] == '+'))
                        n++;
                    for (; n < source.length; n++) {
                        if (source[n] < '0' || source[n] > '9')
                            break;
                    }
                }
                if (n < source.length &&
                    (source[n] == 'f' || source[n] == 'F')) {
                    return {
                        tokenType: tokendef.eTokenType.ttFloatConstant,
                        length: n + 1,
                    };
                }
                else {
                    return {
                        tokenType: tokendef.eTokenType.ttDoubleConstant,
                        length: n,
                    };
                }
            }
            return {
                tokenType: tokendef.eTokenType.ttIntConstant,
                length: n,
            };
        }
        // String constant between double or single quotes
        if (source[0] == '"' || source[0] == "'") {
            // Is it a normal string constant or a heredoc string constant?
            if (source.length >= 6 &&
                source[0] == '"' &&
                source[1] == '"' &&
                source[2] == '"') {
                // Heredoc string constant (spans multiple lines, no escape sequences)
                // Find the length
                let n = 3;
                for (; n < source.length - 2; n++) {
                    if (source[n] == '"' &&
                        source[n + 1] == '"' &&
                        source[n + 2] == '"') {
                        break;
                    }
                }
                return {
                    tokenType: tokendef.eTokenType.ttHeredocStringConstant,
                    length: n + 3,
                };
            }
            else {
                // Normal string constant
                let tokenType = tokendef.eTokenType.ttStringConstant;
                let quote = source[0];
                let evenSlashes = true;
                let n = 1;
                for (; n < source.length; n++) {
                    if (source[n] == '\n') {
                        tokenType = tokendef.eTokenType.ttMultilineStringConstant;
                    }
                    if (source[n] == quote && evenSlashes) {
                        return {
                            tokenType,
                            length: n + 1,
                        };
                    }
                    if (source[n] == '\\')
                        evenSlashes = !evenSlashes;
                    else
                        evenSlashes = true;
                }
                return {
                    tokenType: tokendef.eTokenType.ttNonTerminatedStringConstant,
                    length: n,
                };
            }
        }
        return null;
    }
    IsKeyWord(source) {
        let start = source[0];
        const arr = this.keywordTable.get(start);
        if (arr) {
            for (let e of arr) {
                let wlen = e.wordLength;
                if (source.length >= wlen && source.slice(0, wlen) === e.word) {
                    if (wlen < source.length &&
                        ((source[wlen - 1] >= 'a' && source[wlen - 1] <= 'z') ||
                            (source[wlen - 1] >= 'A' &&
                                source[wlen - 1] <= 'Z') ||
                            (source[wlen - 1] >= '0' &&
                                source[wlen - 1] <= '9')) &&
                        ((source[wlen] >= 'a' && source[wlen] <= 'z') ||
                            (source[wlen] >= 'A' && source[wlen] <= 'Z') ||
                            (source[wlen] >= '0' && source[wlen] <= '9') ||
                            source[wlen] == '_')) {
                        continue;
                    }
                    return {
                        tokenType: e.tokenType,
                        length: wlen,
                    };
                }
            }
        }
        return null;
    }
    IsIdentifier(source) {
        let c = source.charAt(0);
        // Starting with letter or underscore
        if ((c >= 'a' && c <= 'z') ||
            (c >= 'A' && c <= 'Z') ||
            c == '_' ||
            c.charCodeAt(0) > 255 // && engine->ep.allowUnicodeIdentifiers
        ) {
            let tokenLength = 1;
            for (let n = 1; n < source.length; n++) {
                c = source[n];
                if ((c >= 'a' && c <= 'z') ||
                    (c >= 'A' && c <= 'Z') ||
                    (c >= '0' && c <= '9') ||
                    c == '_' ||
                    c.charCodeAt(0) > 255 // && engine->ep.allowUnicodeIdentifiers
                ) {
                    tokenLength++;
                }
                else {
                    break;
                }
            }
            // Make sure the identifier isn't a reserved keyword
            if (this.IsKeyWord(source.slice(0, tokenLength))) {
                return null;
            }
            return {
                tokenType: tokendef.eTokenType.ttIdentifier,
                length: tokenLength,
            };
        }
        return null;
    }
    IsDigitInRadix(ch, radix) {
        if (ch >= '0' && ch <= '9')
            return '0'.charCodeAt(0) < radix;
        if (ch >= 'A' && ch <= 'Z')
            return 'A'.charCodeAt(0) - 10 < radix;
        if (ch >= 'a' && ch <= 'z')
            return 'a'.charCodeAt(0) - 10 < radix;
        return false;
    }
}
exports.asCTokenizer = asCTokenizer;

});

var parser = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.asCParser = exports.Log = void 0;





const format = (fmt, ...args) => {
    return args.reduce((a, b) => a.replace(/%./, b), fmt);
};
var LoggingSeverity;
(function (LoggingSeverity) {
    LoggingSeverity[LoggingSeverity["INFO"] = 1] = "INFO";
    LoggingSeverity[LoggingSeverity["WARNING"] = 2] = "WARNING";
    LoggingSeverity[LoggingSeverity["ERROR"] = 4] = "ERROR";
})(LoggingSeverity || (LoggingSeverity = {}));
class Log extends Error {
    constructor(severity, message, row, col) {
        super();
        this.severity = severity;
        this.message = message;
        this.row = row;
        this.col = col;
    }
}
exports.Log = Log;
class asCParser {
    constructor(tokenizer, config) {
        this.tokenizer = tokenizer;
        this.errorWhileParsing = false;
        this.isSyntaxError = false;
        this.checkValidTypes = false;
        this.isParsingAppInterface = false;
        this.script = null;
        this.scriptNode = null;
        this.tempString = '';
        this.lastToken = null;
        this.sourcePos = 0;
        //
        // ──────────────────────────────────────────────────────────────────────── I ──────────
        //   :::::: C A L L B A C K   M E S S A G E : :  :   :    :     :        :          :
        // ──────────────────────────────────────────────────────────────────────────────────
        //
        this.logs = [];
        //
        // ─── GETTER ─────────────────────────────────────────────────────────────────────
        //
        this.getLogs = () => this.logs;
        this.config = Object.assign({ ep: Object.assign({ allowImplicitHandleTypes: true, alterSyntaxNamedArgs: true }, config === null || config === void 0 ? void 0 : config.ep), templateTypes: ['array'] }, config);
    }
    IsTemplateType(str) {
        return this.config.templateTypes.some((e) => e == str);
    }
    Reset() {
        this.errorWhileParsing = false;
        this.isSyntaxError = false;
        this.checkValidTypes = false;
        this.isParsingAppInterface = false;
        this.sourcePos = 0;
        this.scriptNode = null;
        this.script = null;
        if (this.lastToken) {
            this.lastToken.pos = -1;
        }
    }
    GetScriptNode() {
        return this.scriptNode;
    }
    ParseFunctionDefinition(in_script, in_expectListPattern) {
        if (in_script && in_expectListPattern) {
            this.Reset();
            // Set flag that permits ? as datatype for parameters
            this.isParsingAppInterface = true;
            this.script = in_script;
            this.scriptNode = this.ParseFunctionDefinition();
            if (in_expectListPattern) {
                if (this.scriptNode) {
                    this.scriptNode.AddChildLast(this.ParseListPattern());
                }
            }
            // The declaration should end after the definition
            if (!this.isSyntaxError) {
                let t = this.GetToken();
                if (t.type != tokendef.eTokenType.ttEnd) {
                    this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEnd)), t);
                    this.Error(this.InsteadFound(t), t);
                    return -1;
                }
            }
            if (this.errorWhileParsing) {
                return -1;
            }
            return 0;
        }
        else {
            let node = this.CreateNode(scriptnode.eScriptNode.snFunction);
            node.AddChildLast(this.ParseType(true));
            if (this.isSyntaxError)
                return node;
            node.AddChildLast(this.ParseTypeMod(false));
            if (this.isSyntaxError)
                return node;
            this.ParseOptionalScope(node);
            node.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            node.AddChildLast(this.ParseParameterList());
            if (this.isSyntaxError)
                return node;
            // Parse an optional 'const' after the function definition (used for object methods)
            let t1 = this.GetToken();
            this.RewindTo(t1);
            if (t1.type == tokendef.eTokenType.ttConst) {
                node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttConst));
            }
            // Parse optional attributes
            this.ParseMethodAttributes(node);
            return node;
        }
    }
    CreateNode(type) {
        return new scriptnode.asCScriptNode(type);
    }
    ParseDataType(arg1 = false, arg2 = false) {
        if (arg1 instanceof scriptcode.asCScriptCode) {
            const in_script = arg1;
            const in_isReturnType = arg2;
            this.Reset();
            this.script = in_script;
            this.scriptNode = this.CreateNode(scriptnode.eScriptNode.snDataType);
            if (this.scriptNode == null)
                return -1;
            this.scriptNode.AddChildLast(this.ParseType(true));
            if (this.isSyntaxError)
                return -1;
            if (in_isReturnType) {
                this.scriptNode.AddChildLast(this.ParseTypeMod(false));
                if (this.isSyntaxError)
                    return -1;
            }
            // The declaration should end after the type
            let t = this.GetToken();
            if (t.type != tokendef.eTokenType.ttEnd) {
                this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEnd)), t);
                this.Error(this.InsteadFound(t), t);
                return -1;
            }
            return 0;
        }
        else {
            const allowVariableType = arg1;
            const allowAuto = arg2;
            let node = this.CreateNode(scriptnode.eScriptNode.snDataType);
            let t1 = this.GetToken();
            if (!this.IsDataType(t1) &&
                !(allowVariableType && t1.type == tokendef.eTokenType.ttQuestion) &&
                !(allowAuto && t1.type == tokendef.eTokenType.ttAuto)) {
                if (t1.type === tokendef.eTokenType.ttIdentifier) {
                    if (this.script) {
                        let errMsg = format(texts.TXT_IDENTIFIER_s_NOT_DATA_TYPE, this.script.code.substr(t1.pos, t1.length));
                        this.Error(errMsg, t1);
                    }
                }
                else if (t1.type == tokendef.eTokenType.ttAuto) {
                    this.Error(texts.TXT_AUTO_NOT_ALLOWED, t1);
                }
                else {
                    this.Error(texts.TXT_EXPECTED_DATA_TYPE, t1);
                    this.Error(this.InsteadFound(t1), t1);
                }
                return node;
            }
            node.SetToken(t1);
            node.UpdateSourcePos(t1.pos, t1.length);
            return node;
        }
    }
    // 188
    ParseTemplateDecl(in_script) {
        this.Reset();
        this.script = in_script;
        this.scriptNode = this.CreateNode(scriptnode.eScriptNode.snUndefined);
        if (this.scriptNode == null)
            return -1;
        this.scriptNode.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return -1;
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttLessThan) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttLessThan)), t);
            this.Error(this.InsteadFound(t), t);
            return -1;
        }
        // The class token is optional
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttClass) {
            this.RewindTo(t);
        }
        this.scriptNode.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return -1;
        // There can be multiple sub types
        t = this.GetToken();
        // Parse template types by list separator
        while (t.type == tokendef.eTokenType.ttListSeparator) {
            t = this.GetToken();
            if (t.type != tokendef.eTokenType.ttClass) {
                this.RewindTo(t);
            }
            this.scriptNode.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return -1;
            t = this.GetToken();
        }
        if (t.type != tokendef.eTokenType.ttGreaterThan) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttGreaterThan)), t);
            this.Error(this.InsteadFound(t), t);
            return -1;
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEnd) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEnd)), t);
            this.Error(this.InsteadFound(t), t);
            return -1;
        }
        if (this.errorWhileParsing)
            return -1;
        return 0;
    }
    // 252
    ParsePropertyDeclaration(in_script) {
        this.Reset();
        this.script = in_script;
        this.scriptNode = this.CreateNode(scriptnode.eScriptNode.snDeclaration);
        if (this.scriptNode == null)
            return -1;
        this.scriptNode.AddChildLast(this.ParseType(true));
        if (this.isSyntaxError)
            return -1;
        // Allow optional '&' to indicate that the property is indirect, i.e. stored as reference
        let t = this.GetToken();
        this.RewindTo(t);
        if (t.type == tokendef.eTokenType.ttAmp)
            this.scriptNode.AddChildLast(this.ParseToken(tokendef.eTokenType.ttAmp));
        // Allow optional namespace to be defined before the identifier in case
        // the declaration is to be used for searching for an existing property
        this.ParseOptionalScope(this.scriptNode);
        this.scriptNode.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return -1;
        // The declaration should end after the identifier
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEnd) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEnd)), t);
            this.Error(this.InsteadFound(t), t);
            return -1;
        }
        return 0;
    }
    // 292
    ParseOptionalScope(node) {
        let scope = this.CreateNode(scriptnode.eScriptNode.snScope);
        let t1 = this.GetToken();
        let t2 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttScope) {
            this.RewindTo(t1);
            scope.AddChildLast(this.ParseToken(tokendef.eTokenType.ttScope));
            t1 = this.GetToken();
            t2 = this.GetToken();
        }
        while (t1.type == tokendef.eTokenType.ttIdentifier &&
            t2.type == tokendef.eTokenType.ttScope) {
            this.RewindTo(t1);
            scope.AddChildLast(this.ParseIdentifier());
            scope.AddChildLast(this.ParseToken(tokendef.eTokenType.ttScope));
            t1 = this.GetToken();
            t2 = this.GetToken();
        }
        // The innermost scope may be a template type
        if (t1.type == tokendef.eTokenType.ttIdentifier &&
            t2.type == tokendef.eTokenType.ttLessThan) {
            if (this.script) {
                this.tempString = this.script.code.substr(t1.pos, t1.length);
                if (this.IsTemplateType(this.tempString)) {
                    this.RewindTo(t1);
                    let restore = scope.lastChild;
                    scope.AddChildLast(this.ParseIdentifier());
                    if (this.ParseTemplTypeList(scope, false)) {
                        t2 = this.GetToken();
                        if (t2.type == tokendef.eTokenType.ttScope) {
                            // Template type is part of the scope
                            // Nothing more needs to be done
                            node.AddChildLast(scope);
                            return;
                        }
                        else {
                            // The template type is not part of the scope
                            // Rewind to the template type and end the scope
                            this.RewindTo(t1);
                            // Restore the previously parsed node
                            while (scope.lastChild != restore) {
                                const last = scope.lastChild;
                                if (last) {
                                    last.DisconnectParent();
                                }
                            }
                            if (scope.lastChild) {
                                node.AddChildLast(scope);
                            }
                            return;
                        }
                    }
                }
            }
        }
        // The identifier is not part of the scope
        this.RewindTo(t1);
        if (scope.lastChild) {
            node.AddChildLast(scope);
        }
    }
    // 398
    ParseTypeMod(isParam) {
        let node = this.CreateNode(scriptnode.eScriptNode.snDataType);
        // Parse possible & token
        let t = this.GetToken();
        this.RewindTo(t);
        if (t.type == tokendef.eTokenType.ttAmp) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttAmp));
            if (this.isSyntaxError)
                return node;
            if (isParam) {
                let t = this.GetToken();
                this.RewindTo(t);
                if (t.type == tokendef.eTokenType.ttIn ||
                    t.type == tokendef.eTokenType.ttOut ||
                    t.type == tokendef.eTokenType.ttInOut) {
                    let tokens = [
                        tokendef.eTokenType.ttIn,
                        tokendef.eTokenType.ttOut,
                        tokendef.eTokenType.ttInOut,
                    ];
                    node.AddChildLast(this.ParseOneOf(tokens, 3));
                }
            }
        }
        // Parse possible + token
        t = this.GetToken();
        this.RewindTo(t);
        if (t.type == tokendef.eTokenType.ttPlus) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttPlus));
            if (this.isSyntaxError)
                return node;
        }
        // Parse possible if_handle_then_const token
        t = this.GetToken();
        this.RewindTo(t);
        if (this.IdentifierIs(t, tokendef.IF_HANDLE_TOKEN)) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttIdentifier));
            if (this.isSyntaxError)
                return node;
        }
        return node;
    }
    // 448
    ParseType(allowConst, allowVariableType = false, allowAuto = false) {
        let node = this.CreateNode(scriptnode.eScriptNode.snDataType);
        let t;
        if (allowConst) {
            t = this.GetToken();
            this.RewindTo(t);
            if (t.type == tokendef.eTokenType.ttConst) {
                node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttConst));
                if (this.isSyntaxError)
                    return node;
            }
        }
        // Parse scope prefix
        this.ParseOptionalScope(node);
        // Parse the actual type
        node.AddChildLast(this.ParseDataType(allowVariableType, allowAuto));
        if (this.isSyntaxError)
            return node;
        // If the datatype is a template type, then parse the subtype within the < >
        t = this.GetToken();
        this.RewindTo(t);
        let type = node.lastChild;
        if (this.script && type) {
            this.tempString = this.script.code.substr(type.tokenPos, type.tokenLength);
            if (this.IsTemplateType(this.tempString) &&
                t.type == tokendef.eTokenType.ttLessThan) {
                this.ParseTemplTypeList(node);
                if (this.isSyntaxError)
                    return node;
            }
        }
        // Parse [] and @
        t = this.GetToken();
        this.RewindTo(t);
        while (t.type == tokendef.eTokenType.ttOpenBracket ||
            t.type == tokendef.eTokenType.ttHandle) {
            if (t.type == tokendef.eTokenType.ttOpenBracket) {
                node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttOpenBracket));
                if (this.isSyntaxError)
                    return node;
                t = this.GetToken();
                if (t.type != tokendef.eTokenType.ttCloseBracket) {
                    this.Error(this.ExpectedToken(']'), t);
                    this.Error(this.InsteadFound(t), t);
                    return node;
                }
            }
            else {
                node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttHandle));
                if (this.isSyntaxError)
                    return node;
                t = this.GetToken();
                this.RewindTo(t);
                if (t.type == tokendef.eTokenType.ttConst) {
                    node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttConst));
                    if (this.isSyntaxError)
                        return node;
                }
            }
            t = this.GetToken();
            this.RewindTo(t);
        }
        return node;
    }
    // 527
    ParseTemplTypeList(node, required = true) {
        var _a;
        let t;
        let isValid = true;
        // Remember the last child, so we can restore the state if needed
        let last = node.lastChild;
        // Starts with '<'
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttLessThan) {
            if (required) {
                this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttLessThan)), t);
                this.Error(this.InsteadFound(t), t);
            }
            return false;
        }
        // At least one type
        // TODO: child funcdef: Make this work with !required
        node.AddChildLast(this.ParseType(true, false));
        if (this.isSyntaxError)
            return false;
        t = this.GetToken();
        // Parse template types by list separator
        while (t.type == tokendef.eTokenType.ttListSeparator) {
            // TODO: child funcdef: Make this work with !required
            node.AddChildLast(this.ParseType(true, false));
            if (this.isSyntaxError)
                return false;
            t = this.GetToken();
        }
        // End with '>'
        // Accept >> and >>> tokens too. But then force the tokenizer to move
        // only 1 character ahead (thus splitting the token in two).
        if (((_a = this.script) === null || _a === void 0 ? void 0 : _a.code[t.pos]) != '>') {
            if (required) {
                this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttGreaterThan)), t);
                this.Error(this.InsteadFound(t), t);
            }
            else {
                isValid = false;
            }
        }
        else {
            // Break the token so that only the first > is parsed
            this.SetPos(t.pos + 1);
        }
        if (!required && !isValid) {
            // Restore the original state before returning
            while (node.lastChild != last) {
                let n = node.lastChild;
                if (n) {
                    n.DisconnectParent();
                }
            }
            return false;
        }
        // The template type list was parsed OK
        return true;
    }
    // 599
    ParseToken(token) {
        let node = this.CreateNode(scriptnode.eScriptNode.snUndefined);
        let t1 = this.GetToken();
        if (t1.type != token) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(token)), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.SetToken(t1);
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 620
    ParseOneOf(tokens, count) {
        let node = this.CreateNode(scriptnode.eScriptNode.snUndefined);
        const t1 = this.GetToken();
        let n = tokens.findIndex((e) => e == t1.type);
        if (n == count) {
            this.Error(this.ExpectedOneOf(tokens, count), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.SetToken(t1);
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 684
    ParseRealType() {
        let node = this.CreateNode(scriptnode.eScriptNode.snDataType);
        const t1 = this.GetToken();
        if (this.IsRealType(t1.type)) {
            this.Error(texts.TXT_EXPECTED_DATA_TYPE, t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.SetToken(t1);
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 705
    ParseIdentifier() {
        let node = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
        const t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttIdentifier) {
            this.Error(texts.TXT_EXPECTED_IDENTIFIER, t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.SetToken(t1);
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    ParseParameterList() {
        let node = this.CreateNode(scriptnode.eScriptNode.snParameterList);
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttCloseParanthesis) {
            node.UpdateSourcePos(t1.pos, t1.length);
            // Statement block is finished
            return node;
        }
        else {
            // If the parameter list is just (void) then the void token should be ignored
            if (t1.type == tokendef.eTokenType.ttVoid) {
                let t2 = this.GetToken();
                if (t2.type == tokendef.eTokenType.ttCloseParanthesis) {
                    node.UpdateSourcePos(t2.pos, t2.length);
                    return node;
                }
            }
            this.RewindTo(t1);
            for (;;) {
                // Parse data type
                node.AddChildLast(this.ParseType(true, this.isParsingAppInterface));
                if (this.isSyntaxError)
                    return node;
                node.AddChildLast(this.ParseTypeMod(true));
                if (this.isSyntaxError)
                    return node;
                // Parse optional identifier
                t1 = this.GetToken();
                if (t1.type == tokendef.eTokenType.ttIdentifier) {
                    this.RewindTo(t1);
                    node.AddChildLast(this.ParseIdentifier());
                    if (this.isSyntaxError)
                        return node;
                    t1 = this.GetToken();
                }
                // Parse optional expression for the default arg
                if (t1.type == tokendef.eTokenType.ttAssignment) {
                    // Do a superficial parsing of the default argument
                    // The actual parsing will be done when the argument is compiled for a function call
                    node.AddChildLast(this.SuperficiallyParseExpression());
                    if (this.isSyntaxError)
                        return node;
                    t1 = this.GetToken();
                }
                // Check if list continues
                if (t1.type == tokendef.eTokenType.ttCloseParanthesis) {
                    node.UpdateSourcePos(t1.pos, t1.length);
                    return node;
                }
                else if (t1.type == tokendef.eTokenType.ttListSeparator) {
                    continue;
                }
                else {
                    this.Error(this.ExpectedTokens(')', ','), t1);
                    this.Error(this.InsteadFound(t1), t1);
                    return node;
                }
            }
        }
    }
    // 820
    SuperficiallyParseExpression() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExpression);
        // Simply parse everything until the first , or ), whichever comes first.
        // Keeping in mind that () and {} can group expressions.
        let start = this.GetToken();
        this.RewindTo(start);
        let stack = [];
        let t;
        for (;;) {
            t = this.GetToken();
            if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
                stack.push('(');
            }
            else if (t.type == tokendef.eTokenType.ttCloseParanthesis) {
                if (!stack.length) {
                    // Expression has ended. This token is not part of expression
                    this.RewindTo(t);
                    break;
                }
                else if (stack[stack.length - 1] == '(') {
                    // Group has ended
                    stack.pop();
                }
                else {
                    // Wrong syntax
                    this.RewindTo(t);
                    this.Error(format(texts.TXT_UNEXPECTED_TOKEN_s, ')'), t);
                    return node;
                }
            }
            else if (t.type == tokendef.eTokenType.ttListSeparator) {
                if (!stack.length) {
                    // Expression has ended. This token is not part of expression
                    this.RewindTo(t);
                    break;
                }
            }
            else if (t.type == tokendef.eTokenType.ttStartStatementBlock) {
                stack.push('{');
            }
            else if (t.type == tokendef.eTokenType.ttEndStatementBlock) {
                if (!stack.length || stack[stack.length - 1] != '{') {
                    // Wrong syntax
                    this.RewindTo(t);
                    this.Error(format(texts.TXT_UNEXPECTED_TOKEN_s, '}'), t);
                    return node;
                }
                else {
                    // Group has ended
                    stack.pop();
                }
            }
            else if (t.type == tokendef.eTokenType.ttEndStatement) {
                // Wrong syntax (since we're parsing a default arg expression)
                this.RewindTo(t);
                this.Error(format(texts.TXT_UNEXPECTED_TOKEN_s, ';'), t);
                return node;
            }
            else if (t.type == tokendef.eTokenType.ttNonTerminatedStringConstant) {
                this.RewindTo(t);
                this.Error(texts.TXT_NONTERMINATED_STRING, t);
                return node;
            }
            else if (t.type == tokendef.eTokenType.ttEnd) {
                // Wrong syntax
                this.RewindTo(t);
                this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t);
                this.Info(texts.TXT_WHILE_PARSING_EXPRESSION, start);
                return node;
            }
            // Include the token in the node
            node.UpdateSourcePos(t.pos, t.length);
        }
        return node;
    }
    // 922
    GetToken() {
        var _a, _b, _c;
        let token = new scriptnode.sToken(tokendef.eTokenType.ttUnrecognizedToken, 0, 0);
        // Check if the token has already been parsed
        if (((_a = this.lastToken) === null || _a === void 0 ? void 0 : _a.pos) == this.sourcePos) {
            token = this.lastToken;
            this.sourcePos += token.length;
            if (token.type == tokendef.eTokenType.ttWhiteSpace ||
                token.type == tokendef.eTokenType.ttOnelineComment ||
                token.type == tokendef.eTokenType.ttMultilineComment) {
                token = this.GetToken();
            }
            return token;
        }
        // Parse new token
        let sourceLength = ((_b = this.script) === null || _b === void 0 ? void 0 : _b.code.length) || 0;
        do {
            if (this.sourcePos >= sourceLength) {
                token.type = tokendef.eTokenType.ttEnd;
                token.length = 0;
            }
            else {
                const tmp = this.tokenizer.GetToken(((_c = this.script) === null || _c === void 0 ? void 0 : _c.code.substr(this.sourcePos)) || '');
                token.type = tmp.tokenType;
                token.length = tmp.length;
            }
            token.pos = this.sourcePos;
            // Update state
            this.sourcePos += token.length;
        } while (token.type == tokendef.eTokenType.ttWhiteSpace ||
            token.type == tokendef.eTokenType.ttOnelineComment ||
            token.type == tokendef.eTokenType.ttMultilineComment);
        return token;
    }
    SetPos(pos) {
        if (this.lastToken) {
            this.lastToken.pos = -1;
        }
        this.sourcePos = pos;
    }
    // 965
    RewindTo(token) {
        // Store the token so it doesn't have to be tokenized again
        this.lastToken = token;
        this.sourcePos = token.pos;
    }
    // 978
    Error(text, token) {
        this.RewindTo(token);
        this.isSyntaxError = true;
        this.errorWhileParsing = true;
        if (this.script) {
            let { row, col } = this.script.ConvertPosToRowCol(token.pos);
            this.logs.push(new Log(LoggingSeverity.ERROR, text, row, col));
        }
    }
    // 994
    Warning(text, token) {
        if (this.script) {
            let { row, col } = this.script.ConvertPosToRowCol(token.pos);
            this.logs.push(new Log(LoggingSeverity.WARNING, text, row, col));
        }
    }
    // 1003
    Info(text, token) {
        this.RewindTo(token);
        this.isSyntaxError = true;
        this.errorWhileParsing = true;
        if (this.script) {
            let { row, col } = this.script.ConvertPosToRowCol(token.pos);
            this.logs.push(new Log(LoggingSeverity.INFO, text, row, col));
        }
    }
    // 1017
    IsRealType(tokenType) {
        if (tokenType == tokendef.eTokenType.ttVoid ||
            tokenType == tokendef.eTokenType.ttInt ||
            tokenType == tokendef.eTokenType.ttInt8 ||
            tokenType == tokendef.eTokenType.ttInt16 ||
            tokenType == tokendef.eTokenType.ttInt64 ||
            tokenType == tokendef.eTokenType.ttUInt ||
            tokenType == tokendef.eTokenType.ttUInt8 ||
            tokenType == tokendef.eTokenType.ttUInt16 ||
            tokenType == tokendef.eTokenType.ttUInt64 ||
            tokenType == tokendef.eTokenType.ttFloat ||
            tokenType == tokendef.eTokenType.ttBool ||
            tokenType == tokendef.eTokenType.ttDouble) {
            return true;
        }
        return false;
    }
    // 1036
    IsDataType(token) {
        if (token.type == tokendef.eTokenType.ttIdentifier) {
            /** #ifndef AS_NO_COMPILER
                    if (this.checkValidTypes) {
                        // Check if this is an existing type, regardless of namespace
                        if (this.script) {
                            if(!this.builder.DoesTypeExist(this.script.code.substr(token.pos, token.length)))
                                return false;
                        }
                    }
            #endif */
            return true;
        }
        if (this.IsRealType(token.type)) {
            return true;
        }
        return false;
    }
    // 1058
    ExpectedToken(token) {
        return format(texts.TXT_EXPECTED_s, token);
    }
    // 1067
    ExpectedTokens(t1, t2) {
        return format(texts.TXT_EXPECTED_s_OR_s, t1, t2);
    }
    ExpectedOneOf(tokens, count) {
        let str = texts.TXT_EXPECTED_ONE_OF;
        for (let n = 0; n < count; n++) {
            let tmp = tokens[n];
            if (typeof tmp === 'number') {
                str += tokenizer.asCTokenizer.GetDefinition(tmp);
            }
            else {
                str += tmp;
            }
            if (n < count - 1) {
                str += ', ';
            }
        }
        return str;
    }
    // 1106
    InsteadFound(t) {
        if (t.type == tokendef.eTokenType.ttIdentifier) {
            if (this.script) {
                let id = this.script.code.substr(t.pos, t.length);
                return format(texts.TXT_INSTEAD_FOUND_IDENTIFIER_s, id);
            }
        }
        else if (t.type >= tokendef.eTokenType.ttIf) {
            return format(texts.TXT_INSTEAD_FOUND_KEYWORD_s, tokenizer.asCTokenizer.GetDefinition(t.type));
        }
        return format(texts.TXT_INSTEAD_FOUND_s, tokenizer.asCTokenizer.GetDefinition(t.type));
    }
    ParseListPattern() {
        let node = this.CreateNode(scriptnode.eScriptNode.snListPattern);
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        let start = t1;
        let isBeginning = true;
        let afterType = false;
        while (!this.isSyntaxError) {
            t1 = this.GetToken();
            if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                if (!afterType) {
                    this.Error(texts.TXT_EXPECTED_DATA_TYPE, t1);
                    this.Error(this.InsteadFound(t1), t1);
                }
                break;
            }
            else if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                if (afterType) {
                    this.Error(this.ExpectedTokens(',', '}'), t1);
                    this.Error(this.InsteadFound(t1), t1);
                }
                this.RewindTo(t1);
                node.AddChildLast(this.ParseListPattern());
                afterType = true;
            }
            else if (t1.type == tokendef.eTokenType.ttIdentifier &&
                (this.IdentifierIs(t1, 'repeat') ||
                    this.IdentifierIs(t1, 'repeat_same'))) {
                if (!isBeginning) {
                    if (this.script) {
                        const msg = format(texts.TXT_UNEXPECTED_TOKEN_s, this.script.code.substr(t1.pos, t1.length));
                        this.Error(msg, t1);
                    }
                }
                this.RewindTo(t1);
                node.AddChildLast(this.ParseIdentifier());
            }
            else if (t1.type == tokendef.eTokenType.ttEnd) {
                this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t1);
                this.Info(texts.TXT_WHILE_PARSING_STATEMENT_BLOCK, start);
                break;
            }
            else if (t1.type == tokendef.eTokenType.ttListSeparator) {
                if (!afterType) {
                    this.Error(texts.TXT_EXPECTED_DATA_TYPE, t1);
                    this.Error(this.InsteadFound(t1), t1);
                }
                afterType = false;
            }
            else {
                if (afterType) {
                    this.Error(this.ExpectedTokens(',', '}'), t1);
                    this.Error(this.InsteadFound(t1), t1);
                }
                this.RewindTo(t1);
                node.AddChildLast(this.ParseType(true, true));
                afterType = true;
            }
            isBeginning = false;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 1213
    IdentifierIs(t, str) {
        if (t.type != tokendef.eTokenType.ttIdentifier) {
            return false;
        }
        return this.script && this.script.code.substr(t.pos, t.length) === str;
    }
    // 1221
    ParseMethodAttributes(funcNode) {
        let t1;
        for (;;) {
            t1 = this.GetToken();
            this.RewindTo(t1);
            if (this.IdentifierIs(t1, tokendef.FINAL_TOKEN) ||
                this.IdentifierIs(t1, tokendef.OVERRIDE_TOKEN) ||
                this.IdentifierIs(t1, tokendef.EXPLICIT_TOKEN) ||
                this.IdentifierIs(t1, tokendef.PROPERTY_TOKEN))
                funcNode.AddChildLast(this.ParseIdentifier());
            else
                break;
        }
    }
    // 1245
    IsType() {
        let ret = null;
        // Set a rewind point
        let t = this.GetToken();
        // A type can start with a const
        let t1 = t;
        if (t1.type == tokendef.eTokenType.ttConst) {
            t1 = this.GetToken();
        }
        let t2;
        if (t1.type != tokendef.eTokenType.ttAuto) {
            // The type may be initiated with the scope operator
            if (t1.type == tokendef.eTokenType.ttScope) {
                t1 = this.GetToken();
            }
            // The type may be preceded with a multilevel scope
            t2 = this.GetToken();
            while (t1.type == tokendef.eTokenType.ttIdentifier) {
                if (t2.type == tokendef.eTokenType.ttScope) {
                    t1 = this.GetToken();
                    t2 = this.GetToken();
                    continue;
                }
                else if (t2.type == tokendef.eTokenType.ttLessThan) {
                    // Template types can also be used as scope identifiers
                    this.RewindTo(t2);
                    if (this.CheckTemplateType(t1)) {
                        let t3 = this.GetToken();
                        if (t3.type == tokendef.eTokenType.ttScope) {
                            t1 = this.GetToken();
                            t2 = this.GetToken();
                            continue;
                        }
                    }
                }
                break;
            }
            this.RewindTo(t2);
        }
        // We don't validate if the identifier is an actual declared type at this moment
        // as it may wrongly identify the statement as a non-declaration if the user typed
        // the name incorrectly. The real type is validated in ParseDeclaration where a
        // proper error message can be given.
        if (!this.IsRealType(t1.type) &&
            t1.type != tokendef.eTokenType.ttIdentifier &&
            t1.type != tokendef.eTokenType.ttAuto) {
            this.RewindTo(t);
            return ret;
        }
        if (!this.CheckTemplateType(t1)) {
            this.RewindTo(t);
            return ret;
        }
        // Object handles can be interleaved with the array brackets
        // Even though declaring variables with & is invalid we'll accept
        // it here to give an appropriate error message later
        t2 = this.GetToken();
        while (t2.type == tokendef.eTokenType.ttHandle ||
            t2.type == tokendef.eTokenType.ttAmp ||
            t2.type == tokendef.eTokenType.ttOpenBracket) {
            if (t2.type == tokendef.eTokenType.ttHandle) {
                // A handle can optionally be read-only
                let t3 = this.GetToken();
                if (t3.type != tokendef.eTokenType.ttConst) {
                    this.RewindTo(t3);
                }
            }
            else if (t2.type == tokendef.eTokenType.ttOpenBracket) {
                t2 = this.GetToken();
                if (t2.type != tokendef.eTokenType.ttCloseBracket) {
                    this.RewindTo(t);
                    return ret;
                }
            }
            t2 = this.GetToken();
        }
        // Return the next token so the caller can jump directly to it if desired
        ret = t2;
        // Rewind to start point
        this.RewindTo(t);
        return ret;
    }
    CheckTemplateType(t) {
        // Is this a template type?
        if (this.script &&
            this.IsTemplateType(this.script.code.substr(t.pos, t.length))) {
            // If the next token is a < then parse the sub-type too
            let t1 = this.GetToken();
            if (t1.type != tokendef.eTokenType.ttLessThan) {
                this.RewindTo(t1);
                return true;
            }
            for (;;) {
                // There might optionally be a 'const'
                t1 = this.GetToken();
                if (t1.type == tokendef.eTokenType.ttConst) {
                    t1 = this.GetToken();
                }
                // The type may be initiated with the scope operator
                if (t1.type == tokendef.eTokenType.ttScope) {
                    t1 = this.GetToken();
                }
                // There may be multiple levels of scope operators
                let t2 = this.GetToken();
                while (t1.type == tokendef.eTokenType.ttIdentifier &&
                    t2.type == tokendef.eTokenType.ttScope) {
                    t1 = this.GetToken();
                    t2 = this.GetToken();
                }
                this.RewindTo(t2);
                // Now there must be a data type
                if (!this.IsDataType(t1)) {
                    return false;
                }
                if (!this.CheckTemplateType(t1)) {
                    return false;
                }
                t1 = this.GetToken();
                // Is it a handle or array?
                while (t1.type == tokendef.eTokenType.ttHandle ||
                    t1.type == tokendef.eTokenType.ttOpenBracket) {
                    if (t1.type == tokendef.eTokenType.ttOpenBracket) {
                        t1 = this.GetToken();
                        if (t1.type != tokendef.eTokenType.ttCloseBracket) {
                            return false;
                        }
                    }
                    t1 = this.GetToken();
                }
                // Was this the last template subtype?
                if (t1.type != tokendef.eTokenType.ttListSeparator) {
                    break;
                }
            }
            // Accept >> and >>> tokens too. But then force the tokenizer to move
            // only 1 character ahead (thus splitting the token in two).
            if (this.script.code.charAt(t1.pos) != '>') {
                return false;
            }
            else if (t1.length != 1) {
                this.SetPos(t1.pos + 1);
            }
        }
        return true;
    }
    // 1428
    ParseCast() {
        let node = this.CreateNode(scriptnode.eScriptNode.snCast);
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttCast) {
            this.Error(this.ExpectedToken('cast'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttLessThan) {
            this.Error(this.ExpectedToken('<'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        // Parse the data type
        node.AddChildLast(this.ParseType(true));
        if (this.isSyntaxError)
            return node;
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttGreaterThan) {
            this.Error(this.ExpectedToken('>'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.Error(this.ExpectedToken(')'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 1489
    ParseExprValue() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExprValue);
        let t1 = this.GetToken();
        let t2 = this.GetToken();
        this.RewindTo(t1);
        // 'void' is a special expression that doesn't do anything (normally used for skipping output arguments)
        if (t1.type == tokendef.eTokenType.ttVoid) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttVoid));
        }
        else if (this.IsRealType(t1.type)) {
            node.AddChildLast(this.ParseConstructCall());
        }
        else if (t1.type == tokendef.eTokenType.ttIdentifier ||
            t1.type == tokendef.eTokenType.ttScope) {
            // Check if the expression is an anonymous function
            if (this.IsLambda()) {
                node.AddChildLast(this.ParseLambda());
            }
            else {
                // Determine the last identifier in order to check if it is a type
                let t;
                if (t1.type == tokendef.eTokenType.ttScope) {
                    t = t2;
                }
                else {
                    t = t1;
                }
                this.RewindTo(t);
                t2 = this.GetToken();
                while (t.type == tokendef.eTokenType.ttIdentifier) {
                    t2 = t;
                    t = this.GetToken();
                    if (t.type == tokendef.eTokenType.ttScope) {
                        t = this.GetToken();
                    }
                    else {
                        break;
                    }
                }
                let isDataType = this.IsDataType(t2);
                let isTemplateType = false;
                if (isDataType) {
                    // Is this a template type?
                    if (this.script) {
                        if (this.IsTemplateType(this.script.code.substr(t2.pos, t2.length))) {
                            isTemplateType = true;
                        }
                    }
                }
                t2 = this.GetToken();
                // Rewind so the real parsing can be done, after deciding what to parse
                this.RewindTo(t1);
                // Check if this is a construct call
                // Just 'type()' isn't considered a construct call, because type may just be a function/method name.
                // The compiler will have to sort this out, since the parser doesn't have enough information.
                if (isDataType &&
                    t.type == tokendef.eTokenType.ttOpenBracket &&
                    t2.type == tokendef.eTokenType.ttCloseBracket) {
                    // type[]()
                    node.AddChildLast(this.ParseConstructCall());
                }
                else if (isTemplateType && t.type == tokendef.eTokenType.ttLessThan) {
                    // type<t>()
                    node.AddChildLast(this.ParseConstructCall());
                }
                else if (this.IsFunctionCall()) {
                    node.AddChildLast(this.ParseFunctionCall());
                }
                else {
                    node.AddChildLast(this.ParseVariableAccess());
                }
            }
        }
        else if (t1.type == tokendef.eTokenType.ttCast) {
            node.AddChildLast(this.ParseCast());
        }
        else if (this.IsConstant(t1.type)) {
            node.AddChildLast(this.ParseConstant());
        }
        else if (t1.type == tokendef.eTokenType.ttOpenParanthesis) {
            t1 = this.GetToken();
            node.UpdateSourcePos(t1.pos, t1.length);
            node.AddChildLast(this.ParseAssignment());
            if (this.isSyntaxError)
                return node;
            t1 = this.GetToken();
            if (t1.type != tokendef.eTokenType.ttCloseParanthesis) {
                this.Error(this.ExpectedToken(')'), t1);
                this.Error(this.InsteadFound(t1), t1);
            }
            node.UpdateSourcePos(t1.pos, t1.length);
        }
        else {
            this.Error(texts.TXT_EXPECTED_EXPRESSION_VALUE, t1);
            this.Error(this.InsteadFound(t1), t1);
        }
        return node;
    }
    // 1590
    ParseConstant() {
        let node = this.CreateNode(scriptnode.eScriptNode.snConstant);
        let t = this.GetToken();
        if (!this.IsConstant(t.type)) {
            this.Error(texts.TXT_EXPECTED_CONSTANT, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        // We want to gather a list of string constants to concatenate as children
        if (t.type == tokendef.eTokenType.ttStringConstant ||
            t.type == tokendef.eTokenType.ttMultilineStringConstant ||
            t.type == tokendef.eTokenType.ttHeredocStringConstant) {
            this.RewindTo(t);
        }
        while (t.type == tokendef.eTokenType.ttStringConstant ||
            t.type == tokendef.eTokenType.ttMultilineStringConstant ||
            t.type == tokendef.eTokenType.ttHeredocStringConstant) {
            node.AddChildLast(this.ParseStringConstant());
            t = this.GetToken();
            this.RewindTo(t);
        }
        return node;
    }
    // 1622
    IsLambda() {
        let isLambda = false;
        let t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttIdentifier &&
            this.IdentifierIs(t, tokendef.FUNCTION_TOKEN)) {
            let t2 = this.GetToken();
            if (t2.type == tokendef.eTokenType.ttOpenParanthesis) {
                // Skip until )
                while (t2.type != tokendef.eTokenType.ttCloseParanthesis &&
                    t2.type != tokendef.eTokenType.ttEnd) {
                    t2 = this.GetToken();
                }
                // The next token must be a {
                t2 = this.GetToken();
                if (t2.type == tokendef.eTokenType.ttStartStatementBlock) {
                    isLambda = true;
                }
            }
        }
        this.RewindTo(t);
        return isLambda;
    }
    // 1649
    ParseLambda() {
        let node = this.CreateNode(scriptnode.eScriptNode.snFunction);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttIdentifier ||
            !this.IdentifierIs(t, tokendef.FUNCTION_TOKEN)) {
            this.Error(this.ExpectedToken('function'), t);
            return node;
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t);
            return node;
        }
        // Parse optional type before parameter name
        t = this.IsType();
        if (t) {
            if (t.type == tokendef.eTokenType.ttAmp ||
                t.type == tokendef.eTokenType.ttIdentifier) {
                node.AddChildLast(this.ParseType(true));
                if (this.isSyntaxError)
                    return node;
                node.AddChildLast(this.ParseTypeMod(true));
                if (this.isSyntaxError)
                    return node;
            }
        }
        t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttIdentifier) {
            this.RewindTo(t);
            node.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            t = this.GetToken();
            while (t.type == tokendef.eTokenType.ttListSeparator) {
                // Parse optional type before parameter name
                t = this.IsType();
                if (t) {
                    if (t.type == tokendef.eTokenType.ttAmp ||
                        t.type == tokendef.eTokenType.ttIdentifier) {
                        node.AddChildLast(this.ParseType(true));
                        if (this.isSyntaxError)
                            return node;
                        node.AddChildLast(this.ParseTypeMod(true));
                        if (this.isSyntaxError)
                            return node;
                    }
                }
                node.AddChildLast(this.ParseIdentifier());
                if (this.isSyntaxError)
                    return node;
                t = this.GetToken();
            }
        }
        if (t.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.Error(this.ExpectedToken(')'), t);
            return node;
        }
        // We should just find the end of the statement block here. The statements
        // will be parsed on request by the compiler once it starts the compilation.
        node.AddChildLast(this.SuperficiallyParseStatementBlock());
        return node;
    }
    // 1718
    ParseStringConstant() {
        let node = this.CreateNode(scriptnode.eScriptNode.snConstant);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttStringConstant &&
            t.type != tokendef.eTokenType.ttMultilineStringConstant &&
            t.type != tokendef.eTokenType.ttHeredocStringConstant) {
            this.Error(texts.TXT_EXPECTED_STRING, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 1739
    ParseFunctionCall() {
        let node = this.CreateNode(scriptnode.eScriptNode.snFunctionCall);
        // Parse scope prefix
        this.ParseOptionalScope(node);
        // Parse the function name followed by the argument list
        node.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseArgList());
        return node;
    }
    // 1757
    ParseVariableAccess() {
        let node = this.CreateNode(scriptnode.eScriptNode.snVariableAccess);
        // Parse scope prefix
        this.ParseOptionalScope(node);
        // Parse the variable name
        node.AddChildLast(this.ParseIdentifier());
        return node;
    }
    // 1771
    ParseConstructCall() {
        let node = this.CreateNode(scriptnode.eScriptNode.snConstructCall);
        node.AddChildLast(this.ParseType(false));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseArgList());
        return node;
    }
    // 1786
    ParseArgList(withParenthesis = true) {
        let node = this.CreateNode(scriptnode.eScriptNode.snArgList);
        let t1;
        if (withParenthesis) {
            t1 = this.GetToken();
            if (t1.type != tokendef.eTokenType.ttOpenParanthesis) {
                this.Error(this.ExpectedToken('('), t1);
                this.Error(this.InsteadFound(t1), t1);
                return node;
            }
            node.UpdateSourcePos(t1.pos, t1.length);
        }
        t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttCloseParanthesis ||
            t1.type == tokendef.eTokenType.ttCloseBracket) {
            if (withParenthesis) {
                if (t1.type == tokendef.eTokenType.ttCloseParanthesis) {
                    node.UpdateSourcePos(t1.pos, t1.length);
                }
                else {
                    const str = format(texts.TXT_UNEXPECTED_TOKEN_s, tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttCloseBracket));
                    this.Error(str, t1);
                }
            }
            else {
                this.RewindTo(t1);
            }
            // Argument list has ended
            return node;
        }
        else {
            this.RewindTo(t1);
            for (;;) {
                // Determine if this is a named argument
                let tl = this.GetToken();
                let t2 = this.GetToken();
                this.RewindTo(tl);
                // Named arguments uses the syntax: arg : expr
                // This avoids confusion when the argument has the same name as a local variable, i.e. var = expr
                // It also avoids conflict with expressions to that creates anonymous objects initialized with lists, i.e. type = {...}
                // The alternate syntax: arg = expr, is supported to provide backwards compatibility with 2.29.0
                // TODO: 3.0.0: Remove the alternate syntax
                if (tl.type == tokendef.eTokenType.ttIdentifier &&
                    (t2.type == tokendef.eTokenType.ttColon ||
                        (this.config.ep.alterSyntaxNamedArgs &&
                            t2.type == tokendef.eTokenType.ttAssignment))) {
                    const named = this.CreateNode(scriptnode.eScriptNode.snNamedArgument);
                    node.AddChildLast(named);
                    named.AddChildLast(this.ParseIdentifier());
                    t2 = this.GetToken();
                    if (this.config.ep.alterSyntaxNamedArgs &&
                        t2.type == tokendef.eTokenType.ttAssignment)
                        this.Warning(texts.TXT_NAMED_ARGS_WITH_OLD_SYNTAX, t2);
                    named.AddChildLast(this.ParseAssignment());
                }
                else {
                    node.AddChildLast(this.ParseAssignment());
                }
                if (this.isSyntaxError)
                    return node;
                // Check if list continues
                t1 = this.GetToken();
                if (t1.type == tokendef.eTokenType.ttListSeparator) {
                    continue;
                }
                else {
                    if (withParenthesis) {
                        if (t1.type == tokendef.eTokenType.ttCloseParanthesis) {
                            node.UpdateSourcePos(t1.pos, t1.length);
                        }
                        else {
                            this.Error(this.ExpectedTokens(')', ','), t1);
                            this.Error(this.InsteadFound(t1), t1);
                        }
                    }
                    else {
                        this.RewindTo(t1);
                    }
                    return node;
                }
            }
        }
    }
    // 1887
    IsFunctionCall() {
        let s;
        let t1, t2;
        s = this.GetToken();
        t1 = s;
        // A function call may be prefixed with scope resolution
        if (t1.type == tokendef.eTokenType.ttScope) {
            t1 = this.GetToken();
        }
        t2 = this.GetToken();
        while (t1.type == tokendef.eTokenType.ttIdentifier &&
            t2.type == tokendef.eTokenType.ttScope) {
            t1 = this.GetToken();
            t2 = this.GetToken();
        }
        // A function call starts with an identifier followed by an argument list
        // The parser doesn't have enough information about scope to determine if the
        // identifier is a datatype, so even if it happens to be the parser will
        // identify the expression as a function call rather than a construct call.
        // The compiler will sort this out later
        if (t1.type != tokendef.eTokenType.ttIdentifier) {
            this.RewindTo(s);
            return false;
        }
        if (t2.type == tokendef.eTokenType.ttOpenParanthesis) {
            this.RewindTo(s);
            return true;
        }
        this.RewindTo(s);
        return false;
    }
    ParseAssignment() {
        let node = this.CreateNode(scriptnode.eScriptNode.snAssignment);
        node.AddChildLast(this.ParseCondition());
        if (this.isSyntaxError)
            return node;
        let t = this.GetToken();
        this.RewindTo(t);
        if (this.IsAssignOperator(t.type)) {
            node.AddChildLast(this.ParseAssignOperator());
            if (this.isSyntaxError)
                return node;
            node.AddChildLast(this.ParseAssignment());
            if (this.isSyntaxError)
                return node;
        }
        return node;
    }
    // 1953
    ParseCondition() {
        let node = this.CreateNode(scriptnode.eScriptNode.snCondition);
        node.AddChildLast(this.ParseExpression());
        if (this.isSyntaxError)
            return node;
        let t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttQuestion) {
            node.AddChildLast(this.ParseAssignment());
            if (this.isSyntaxError)
                return node;
            t = this.GetToken();
            if (t.type != tokendef.eTokenType.ttColon) {
                this.Error(this.ExpectedToken(':'), t);
                this.Error(this.InsteadFound(t), t);
                return node;
            }
            node.AddChildLast(this.ParseAssignment());
            if (this.isSyntaxError)
                return node;
        }
        else {
            this.RewindTo(t);
        }
        return node;
    }
    ParseExpression(in_script) {
        if (!in_script) {
            // 1986
            let node = this.CreateNode(scriptnode.eScriptNode.snExpression);
            node.AddChildLast(this.ParseExprTerm());
            if (this.isSyntaxError)
                return node;
            for (;;) {
                let t = this.GetToken();
                this.RewindTo(t);
                if (!this.IsOperator(t.type))
                    return node;
                node.AddChildLast(this.ParseExprOperator());
                if (this.isSyntaxError)
                    return node;
                node.AddChildLast(this.ParseExprTerm());
                if (this.isSyntaxError)
                    return node;
            }
        }
        else {
            // 2311
            this.Reset();
            this.script = in_script;
            this.checkValidTypes = true;
            this.scriptNode = this.ParseExpression();
            if (this.errorWhileParsing) {
                return -1;
            }
            return 0;
        }
    }
    // 2013
    ParseExprTerm() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExprTerm);
        // Check if the expression term is an initialization of a temp object with init list, i.e. type = {...}
        let t = this.GetToken();
        let t2 = t;
        let t3;
        if (this.IsDataType(t2) && this.CheckTemplateType(t2)) {
            // The next token must be a = followed by a {
            t2 = this.GetToken();
            t3 = this.GetToken();
            if (t2.type == tokendef.eTokenType.ttAssignment &&
                t3.type == tokendef.eTokenType.ttStartStatementBlock) {
                // It is an initialization, now parse it for real
                this.RewindTo(t);
                node.AddChildLast(this.ParseType(false));
                t2 = this.GetToken();
                node.AddChildLast(this.ParseInitList());
                return node;
            }
        }
        else if (t.type == tokendef.eTokenType.ttStartStatementBlock) {
            // Or an anonymous init list, i.e. {...}
            this.RewindTo(t);
            node.AddChildLast(this.ParseInitList());
            return node;
        }
        // It wasn't an initialization, so it must be an ordinary expression term
        this.RewindTo(t);
        for (;;) {
            t = this.GetToken();
            this.RewindTo(t);
            if (!this.IsPreOperator(t.type)) {
                break;
            }
            node.AddChildLast(this.ParseExprPreOp());
            if (this.isSyntaxError)
                return node;
        }
        node.AddChildLast(this.ParseExprValue());
        if (this.isSyntaxError)
            return node;
        for (;;) {
            t = this.GetToken();
            this.RewindTo(t);
            if (!this.IsPostOperator(t.type)) {
                return node;
            }
            node.AddChildLast(this.ParseExprPostOp());
            if (this.isSyntaxError)
                return node;
        }
    }
    // 2077
    ParseExprPreOp() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExprPreOp);
        const t = this.GetToken();
        if (!this.IsPreOperator(t.type)) {
            this.Error(texts.TXT_EXPECTED_PRE_OPERATOR, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 2098
    ParseExprPostOp() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExprPostOp);
        let t = this.GetToken();
        if (!this.IsPostOperator(t.type)) {
            this.Error(texts.TXT_EXPECTED_POST_OPERATOR, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        if (t.type == tokendef.eTokenType.ttDot) {
            let t1 = this.GetToken();
            let t2 = this.GetToken();
            this.RewindTo(t1);
            if (t2.type == tokendef.eTokenType.ttOpenParanthesis) {
                node.AddChildLast(this.ParseFunctionCall());
            }
            else {
                node.AddChildLast(this.ParseIdentifier());
            }
        }
        else if (t.type == tokendef.eTokenType.ttOpenBracket) {
            node.AddChildLast(this.ParseArgList(false));
            t = this.GetToken();
            if (t.type != tokendef.eTokenType.ttCloseBracket) {
                this.Error(this.ExpectedToken(']'), t);
                this.Error(this.InsteadFound(t), t);
                return node;
            }
            node.UpdateSourcePos(t.pos, t.length);
        }
        else if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
            this.RewindTo(t);
            node.AddChildLast(this.ParseArgList());
        }
        return node;
    }
    // 2154
    ParseExprOperator() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExprOperator);
        let t = this.GetToken();
        if (!this.IsOperator(t.type)) {
            this.Error(texts.TXT_EXPECTED_OPERATOR, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 2175
    ParseAssignOperator() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExprOperator);
        let t = this.GetToken();
        if (!this.IsAssignOperator(t.type)) {
            this.Error(texts.TXT_EXPECTED_OPERATOR, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 2195
    IsOperator(tokenType) {
        return (tokenType == tokendef.eTokenType.ttPlus ||
            tokenType == tokendef.eTokenType.ttMinus ||
            tokenType == tokendef.eTokenType.ttStar ||
            tokenType == tokendef.eTokenType.ttSlash ||
            tokenType == tokendef.eTokenType.ttPercent ||
            tokenType == tokendef.eTokenType.ttStarStar ||
            tokenType == tokendef.eTokenType.ttAnd ||
            tokenType == tokendef.eTokenType.ttOr ||
            tokenType == tokendef.eTokenType.ttXor ||
            tokenType == tokendef.eTokenType.ttEqual ||
            tokenType == tokendef.eTokenType.ttNotEqual ||
            tokenType == tokendef.eTokenType.ttLessThan ||
            tokenType == tokendef.eTokenType.ttLessThanOrEqual ||
            tokenType == tokendef.eTokenType.ttGreaterThan ||
            tokenType == tokendef.eTokenType.ttGreaterThanOrEqual ||
            tokenType == tokendef.eTokenType.ttAmp ||
            tokenType == tokendef.eTokenType.ttBitOr ||
            tokenType == tokendef.eTokenType.ttBitXor ||
            tokenType == tokendef.eTokenType.ttBitShiftLeft ||
            tokenType == tokendef.eTokenType.ttBitShiftRight ||
            tokenType == tokendef.eTokenType.ttBitShiftRightArith ||
            tokenType == tokendef.eTokenType.ttIs ||
            tokenType == tokendef.eTokenType.ttNotIs);
    }
    // 2225
    IsAssignOperator(tokenType) {
        return (tokenType == tokendef.eTokenType.ttAssignment ||
            tokenType == tokendef.eTokenType.ttAddAssign ||
            tokenType == tokendef.eTokenType.ttSubAssign ||
            tokenType == tokendef.eTokenType.ttMulAssign ||
            tokenType == tokendef.eTokenType.ttDivAssign ||
            tokenType == tokendef.eTokenType.ttModAssign ||
            tokenType == tokendef.eTokenType.ttPowAssign ||
            tokenType == tokendef.eTokenType.ttAndAssign ||
            tokenType == tokendef.eTokenType.ttOrAssign ||
            tokenType == tokendef.eTokenType.ttXorAssign ||
            tokenType == tokendef.eTokenType.ttShiftLeftAssign ||
            tokenType == tokendef.eTokenType.ttShiftRightLAssign ||
            tokenType == tokendef.eTokenType.ttShiftRightAAssign);
    }
    // 2245
    IsPreOperator(tokenType) {
        return (tokenType == tokendef.eTokenType.ttMinus ||
            tokenType == tokendef.eTokenType.ttPlus ||
            tokenType == tokendef.eTokenType.ttNot ||
            tokenType == tokendef.eTokenType.ttInc ||
            tokenType == tokendef.eTokenType.ttDec ||
            tokenType == tokendef.eTokenType.ttBitNot ||
            tokenType == tokendef.eTokenType.ttHandle);
    }
    // 2258
    IsPostOperator(tokenType) {
        return (tokenType == tokendef.eTokenType.ttInc ||
            tokenType == tokendef.eTokenType.ttDec ||
            tokenType == tokendef.eTokenType.ttDot ||
            tokenType == tokendef.eTokenType.ttOpenBracket ||
            tokenType == tokendef.eTokenType.ttOpenParanthesis);
    }
    // 2269
    IsConstant(tokenType) {
        return (tokenType == tokendef.eTokenType.ttIntConstant ||
            tokenType == tokendef.eTokenType.ttFloatConstant ||
            tokenType == tokendef.eTokenType.ttDoubleConstant ||
            tokenType == tokendef.eTokenType.ttStringConstant ||
            tokenType == tokendef.eTokenType.ttMultilineStringConstant ||
            tokenType == tokendef.eTokenType.ttHeredocStringConstant ||
            tokenType == tokendef.eTokenType.ttTrue ||
            tokenType == tokendef.eTokenType.ttFalse ||
            tokenType == tokendef.eTokenType.ttBitsConstant ||
            tokenType == tokendef.eTokenType.ttNull);
    }
    ParseScript(arg) {
        if (arg instanceof scriptcode.asCScriptCode) {
            const in_script = arg;
            this.Reset();
            this.script = in_script;
            this.scriptNode = this.ParseScript(false);
            if (this.errorWhileParsing) {
                return -1;
            }
            return 0;
        }
        else {
            const inBlock = arg;
            let node = this.CreateNode(scriptnode.eScriptNode.snScript);
            // Determine type of node
            for (;;) {
                while (!this.isSyntaxError) {
                    let tStart = this.GetToken();
                    // Optimize by skipping tokens 'shared', 'external', 'final', 'abstract' so they don't have to be checked in every condition
                    let t1 = tStart;
                    while (this.IdentifierIs(t1, tokendef.SHARED_TOKEN) ||
                        this.IdentifierIs(t1, tokendef.EXTERNAL_TOKEN) ||
                        this.IdentifierIs(t1, tokendef.FINAL_TOKEN) ||
                        this.IdentifierIs(t1, tokendef.ABSTRACT_TOKEN)) {
                        t1 = this.GetToken();
                    }
                    this.RewindTo(tStart);
                    if (t1.type == tokendef.eTokenType.ttImport) {
                        node.AddChildLast(this.ParseImport());
                    }
                    else if (t1.type == tokendef.eTokenType.ttEnum) {
                        node.AddChildLast(this.ParseEnumeration()); // Handle enumerations
                    }
                    else if (t1.type == tokendef.eTokenType.ttTypedef) {
                        node.AddChildLast(this.ParseTypedef()); // Handle primitive typedefs
                    }
                    else if (t1.type == tokendef.eTokenType.ttClass) {
                        node.AddChildLast(this.ParseClass());
                    }
                    else if (t1.type == tokendef.eTokenType.ttMixin) {
                        node.AddChildLast(this.ParseMixin());
                    }
                    else if (t1.type == tokendef.eTokenType.ttInterface) {
                        node.AddChildLast(this.ParseInterface());
                    }
                    else if (t1.type == tokendef.eTokenType.ttFuncDef) {
                        node.AddChildLast(this.ParseFuncDef());
                    }
                    else if (t1.type == tokendef.eTokenType.ttConst ||
                        t1.type == tokendef.eTokenType.ttScope ||
                        t1.type == tokendef.eTokenType.ttAuto ||
                        this.IsDataType(t1)) {
                        if (this.IsVirtualPropertyDecl()) {
                            node.AddChildLast(this.ParseVirtualPropertyDecl(false, false));
                        }
                        else if (this.IsVarDecl()) {
                            node.AddChildLast(this.ParseDeclaration(false, true));
                        }
                        else {
                            node.AddChildLast(this.ParseFunction());
                        }
                    }
                    else if (t1.type == tokendef.eTokenType.ttEndStatement) {
                        // Ignore a semicolon by itself
                        t1 = this.GetToken();
                    }
                    else if (t1.type == tokendef.eTokenType.ttNamespace) {
                        node.AddChildLast(this.ParseNamespace());
                    }
                    else if (t1.type == tokendef.eTokenType.ttEnd) {
                        return node;
                    }
                    else if (inBlock &&
                        t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                        return node;
                    }
                    else {
                        let t = tokenizer.asCTokenizer.GetDefinition(t1.type);
                        if (!t) {
                            t = '<unknown token>';
                        }
                        this.Error(format(texts.TXT_UNEXPECTED_TOKEN_s, t), t1);
                    }
                }
                if (this.isSyntaxError) {
                    // Search for either ';' or '{' or end
                    let t1 = this.GetToken();
                    while (t1.type != tokendef.eTokenType.ttEndStatement &&
                        t1.type != tokendef.eTokenType.ttEnd &&
                        t1.type != tokendef.eTokenType.ttStartStatementBlock) {
                        t1 = this.GetToken();
                    }
                    if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                        // Find the end of the block and skip nested blocks
                        let level = 1;
                        while (level > 0) {
                            t1 = this.GetToken();
                            if (t1.type == tokendef.eTokenType.ttStartStatementBlock)
                                level++;
                            if (t1.type == tokendef.eTokenType.ttEndStatementBlock)
                                level--;
                            if (t1.type == tokendef.eTokenType.ttEnd)
                                break;
                        }
                    }
                    this.isSyntaxError = false;
                }
            }
        }
    }
    // 2327
    ParseImport() {
        let node = this.CreateNode(scriptnode.eScriptNode.snImport);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttImport) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttImport)), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.UpdateSourcePos(t.pos, t.length);
        node.AddChildLast(this.ParseFunctionDefinition());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttIdentifier) {
            this.Error(this.ExpectedToken(tokendef.FROM_TOKEN), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        if (this.script &&
            this.script.code.substr(t.pos, t.length) != tokendef.FROM_TOKEN) {
            this.Error(this.ExpectedToken(tokendef.FROM_TOKEN), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttStringConstant) {
            this.Error(texts.TXT_EXPECTED_STRING, t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        let mod = this.CreateNode(scriptnode.eScriptNode.snConstant);
        node.AddChildLast(mod);
        mod.SetToken(t);
        mod.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEndStatement)), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 2492
    ParseNamespace() {
        let node = this.CreateNode(scriptnode.eScriptNode.snNamespace);
        let t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttNamespace) {
            node.UpdateSourcePos(t1.pos, t1.length);
        }
        else {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttNamespace)), t1);
            this.Error(this.InsteadFound(t1), t1);
        }
        node.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return node;
        let lowestNode = node;
        t1 = this.GetToken();
        while (t1.type == tokendef.eTokenType.ttScope) {
            lowestNode.UpdateSourcePos(t1.pos, t1.length);
            let scopeNode = this.CreateNode(scriptnode.eScriptNode.snScript);
            lowestNode.AddChildLast(scopeNode);
            lowestNode = this.CreateNode(scriptnode.eScriptNode.snNamespace);
            scopeNode.AddChildLast(lowestNode);
            lowestNode.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            t1 = this.GetToken();
        }
        if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
            node.UpdateSourcePos(t1.pos, t1.length);
        }
        else {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttStartStatementBlock)), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        let start = t1;
        lowestNode.AddChildLast(this.ParseScript(true));
        if (!this.isSyntaxError) {
            t1 = this.GetToken();
            if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                node.UpdateSourcePos(t1.pos, t1.length);
            }
            else {
                if (t1.type == tokendef.eTokenType.ttEnd) {
                    this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t1);
                }
                else {
                    this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEndStatementBlock)), t1);
                    this.Error(this.InsteadFound(t1), t1);
                }
                this.Info(texts.TXT_WHILE_PARSING_NAMESPACE, start);
                return node;
            }
        }
        return node;
    }
    ParseStatementBlock(in_script, in_block) {
        if (in_script && in_block) {
            this.Reset();
            // Tell the parser to validate the identifiers as valid types
            this.checkValidTypes = true;
            this.script = in_script;
            this.sourcePos = in_block.tokenPos;
            this.scriptNode = this.ParseStatementBlock();
            if (this.isSyntaxError || this.errorWhileParsing) {
                return -1;
            }
            return 0;
        }
        else {
            let node = this.CreateNode(scriptnode.eScriptNode.snStatementBlock);
            let t1 = this.GetToken();
            if (t1.type != tokendef.eTokenType.ttStartStatementBlock) {
                this.Error(this.ExpectedToken('{'), t1);
                this.Error(this.InsteadFound(t1), t1);
                return node;
            }
            let start = t1;
            node.UpdateSourcePos(t1.pos, t1.length);
            for (;;) {
                while (!this.isSyntaxError) {
                    t1 = this.GetToken();
                    if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                        node.UpdateSourcePos(t1.pos, t1.length);
                        // Statement block is finished
                        return node;
                    }
                    else {
                        this.RewindTo(t1);
                        if (this.IsVarDecl()) {
                            node.AddChildLast(this.ParseDeclaration());
                        }
                        else {
                            const tmp = this.ParseStatement();
                            if (tmp) {
                                node.AddChildLast(tmp);
                            }
                        }
                    }
                }
                if (this.isSyntaxError) {
                    // Search for either ';', '{', '}', or end
                    t1 = this.GetToken();
                    while (t1.type != tokendef.eTokenType.ttEndStatement &&
                        t1.type != tokendef.eTokenType.ttEnd &&
                        t1.type != tokendef.eTokenType.ttStartStatementBlock &&
                        t1.type != tokendef.eTokenType.ttEndStatementBlock) {
                        t1 = this.GetToken();
                    }
                    // Skip this statement block
                    if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                        // Find the end of the block and skip nested blocks
                        let level = 1;
                        while (level > 0) {
                            t1 = this.GetToken();
                            if (t1.type == tokendef.eTokenType.ttStartStatementBlock)
                                level++;
                            if (t1.type == tokendef.eTokenType.ttEndStatementBlock)
                                level--;
                            if (t1.type == tokendef.eTokenType.ttEnd)
                                break;
                        }
                    }
                    else if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                        this.RewindTo(t1);
                    }
                    else if (t1.type == tokendef.eTokenType.ttEnd) {
                        this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t1);
                        this.Info(texts.TXT_WHILE_PARSING_STATEMENT_BLOCK, start);
                        return node;
                    }
                    this.isSyntaxError = false;
                }
            }
        }
    }
    // 2590
    ParseEnumeration() {
        let ident;
        let dataType;
        let node = this.CreateNode(scriptnode.eScriptNode.snEnum);
        // Optional 'shared' and 'external' token
        let token = this.GetToken();
        while (this.IdentifierIs(token, tokendef.SHARED_TOKEN) ||
            this.IdentifierIs(token, tokendef.EXTERNAL_TOKEN)) {
            this.RewindTo(token);
            node.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            token = this.GetToken();
        }
        // Check for enum
        if (token.type != tokendef.eTokenType.ttEnum) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEnum)), token);
            this.Error(this.InsteadFound(token), token);
            return node;
        }
        node.SetToken(token);
        node.UpdateSourcePos(token.pos, token.length);
        // Get the identifier
        token = this.GetToken();
        if (tokendef.eTokenType.ttIdentifier != token.type) {
            this.Error(texts.TXT_EXPECTED_IDENTIFIER, token);
            this.Error(this.InsteadFound(token), token);
            return node;
        }
        dataType = this.CreateNode(scriptnode.eScriptNode.snDataType);
        node.AddChildLast(dataType);
        ident = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
        ident.SetToken(token);
        ident.UpdateSourcePos(token.pos, token.length);
        dataType.AddChildLast(ident);
        // External shared declarations are ended with ';'
        token = this.GetToken();
        if (token.type == tokendef.eTokenType.ttEndStatement) {
            this.RewindTo(token);
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttEndStatement));
            return node;
        }
        // check for the start of the declaration block
        if (token.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.RewindTo(token);
            const tokens = [
                tokendef.eTokenType.ttStartStatementBlock,
                tokendef.eTokenType.ttEndStatement,
            ];
            this.Error(this.ExpectedOneOf(tokens, 2), token);
            this.Error(this.InsteadFound(token), token);
            return node;
        }
        // typescript error: token.type != eTokenType.ttEnd
        while (true) {
            token = this.GetToken();
            if (token.type == tokendef.eTokenType.ttEndStatementBlock) {
                this.RewindTo(token);
                break;
            }
            if (token.type != tokendef.eTokenType.ttIdentifier) {
                this.Error(texts.TXT_EXPECTED_IDENTIFIER, token);
                this.Error(this.InsteadFound(token), token);
                return node;
            }
            // Add the enum element
            ident = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
            ident.SetToken(token);
            ident.UpdateSourcePos(token.pos, token.length);
            node.AddChildLast(ident);
            token = this.GetToken();
            if (token.type == tokendef.eTokenType.ttAssignment) {
                this.RewindTo(token);
                let tmp = this.SuperficiallyParseVarInit();
                node.AddChildLast(tmp);
                if (this.isSyntaxError)
                    return node;
                token = this.GetToken();
            }
            if (token.type != tokendef.eTokenType.ttListSeparator) {
                this.RewindTo(token);
                break;
            }
        }
        // check for the end of the declaration block
        token = this.GetToken();
        if (token.type != tokendef.eTokenType.ttEndStatementBlock) {
            this.RewindTo(token);
            this.Error(this.ExpectedToken('}'), token);
            this.Error(this.InsteadFound(token), token);
            return node;
        }
        return node;
    }
    // 2723
    IsVarDecl() {
        // Set start point so that we can rewind
        let t = this.GetToken();
        this.RewindTo(t);
        // A class property decl can be preceded by 'private' or 'protected'
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttPrivate &&
            t1.type != tokendef.eTokenType.ttProtected) {
            this.RewindTo(t1);
        }
        // A variable decl starts with the type
        t1 = this.IsType();
        if (!t1) {
            this.RewindTo(t);
            return false;
        }
        // Jump to the token after the type
        this.RewindTo(t1);
        t1 = this.GetToken();
        // The declaration needs to have a name
        if (t1.type != tokendef.eTokenType.ttIdentifier) {
            this.RewindTo(t);
            return false;
        }
        // It can be followed by an initialization
        t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttEndStatement ||
            t1.type == tokendef.eTokenType.ttAssignment ||
            t1.type == tokendef.eTokenType.ttListSeparator) {
            this.RewindTo(t);
            return true;
        }
        if (t1.type == tokendef.eTokenType.ttOpenParanthesis) {
            // If the closing parenthesis is followed by a statement block,
            // function decorator, or end-of-file, then treat it as a function.
            // A function decl may have nested parenthesis so we need to check
            // for this too.
            let nest = 0;
            while (t1.type != tokendef.eTokenType.ttEnd) {
                if (t1.type == tokendef.eTokenType.ttOpenParanthesis) {
                    nest++;
                }
                else if (t1.type == tokendef.eTokenType.ttCloseParanthesis) {
                    nest--;
                    if (nest == 0) {
                        break;
                    }
                }
                t1 = this.GetToken();
            }
            if (t1.type == tokendef.eTokenType.ttEnd) {
                this.RewindTo(t);
                return false;
            }
            else {
                t1 = this.GetToken();
                this.RewindTo(t);
                if (t1.type == tokendef.eTokenType.ttStartStatementBlock ||
                    t1.type == tokendef.eTokenType.ttIdentifier ||
                    t1.type == tokendef.eTokenType.ttEnd) {
                    return false;
                }
            }
            this.RewindTo(t);
            return true;
        }
        this.RewindTo(t);
        return false;
    }
    // 2804
    IsVirtualPropertyDecl() {
        // Set start point so that we can rewind
        let t = this.GetToken();
        this.RewindTo(t);
        // A class property decl can be preceded by 'private' or 'protected'
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttPrivate &&
            t1.type != tokendef.eTokenType.ttProtected) {
            this.RewindTo(t1);
        }
        // A variable decl starts with the type
        t1 = this.IsType();
        if (!t1) {
            this.RewindTo(t);
            return false;
        }
        // Move to the token after the type
        this.RewindTo(t1);
        t1 = this.GetToken();
        // The decl must have an identifier
        if (t1.type != tokendef.eTokenType.ttIdentifier) {
            this.RewindTo(t);
            return false;
        }
        // To be a virtual property it must also have a block for the get/set functions
        t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
            this.RewindTo(t);
            return true;
        }
        this.RewindTo(t);
        return false;
    }
    // 2847
    IsFuncDecl(isMethod) {
        // Set start point so that we can rewind
        let t = this.GetToken();
        this.RewindTo(t);
        if (isMethod) {
            // A class method decl can be preceded by 'private' or 'protected'
            let t1 = this.GetToken();
            if (t1.type != tokendef.eTokenType.ttPrivate &&
                t1.type != tokendef.eTokenType.ttProtected) {
                this.RewindTo(t1);
            }
            // A class constructor starts with identifier followed by parenthesis
            // A class destructor starts with the ~ token
            t1 = this.GetToken();
            let t2 = this.GetToken();
            this.RewindTo(t1);
            if ((t1.type == tokendef.eTokenType.ttIdentifier &&
                t2.type == tokendef.eTokenType.ttOpenParanthesis) ||
                t1.type == tokendef.eTokenType.ttBitNot) {
                this.RewindTo(t);
                return true;
            }
        }
        // A function decl starts with a type
        let t1 = this.IsType();
        if (!t1) {
            this.RewindTo(t);
            return false;
        }
        // Move to the token after the type
        this.RewindTo(t1);
        t1 = this.GetToken();
        // There can be an ampersand if the function returns a reference
        if (t1.type == tokendef.eTokenType.ttAmp) {
            this.RewindTo(t);
            return true;
        }
        if (t1.type != tokendef.eTokenType.ttIdentifier) {
            this.RewindTo(t);
            return false;
        }
        t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttOpenParanthesis) {
            // If the closing parenthesis is not followed by a
            // statement block then it is not a function.
            // It's possible that there are nested parenthesis due to default
            // arguments so this should be checked for.
            let nest = 0;
            t1 = this.GetToken();
            while ((nest || t1.type != tokendef.eTokenType.ttCloseParanthesis) &&
                t1.type != tokendef.eTokenType.ttEnd) {
                if (t1.type == tokendef.eTokenType.ttOpenParanthesis) {
                    nest++;
                }
                if (t1.type == tokendef.eTokenType.ttCloseParanthesis) {
                    nest--;
                }
                t1 = this.GetToken();
            }
            if (t1.type == tokendef.eTokenType.ttEnd) {
                return false;
            }
            else {
                if (isMethod) {
                    // A class method can have a 'const' token after the parameter list
                    t1 = this.GetToken();
                    if (t1.type != tokendef.eTokenType.ttConst)
                        this.RewindTo(t1);
                }
                // A function may also have any number of additional attributes
                for (;;) {
                    t1 = this.GetToken();
                    if (!this.IdentifierIs(t1, tokendef.FINAL_TOKEN) &&
                        !this.IdentifierIs(t1, tokendef.OVERRIDE_TOKEN) &&
                        !this.IdentifierIs(t1, tokendef.EXPLICIT_TOKEN) &&
                        !this.IdentifierIs(t1, tokendef.PROPERTY_TOKEN)) {
                        this.RewindTo(t1);
                        break;
                    }
                }
                t1 = this.GetToken();
                this.RewindTo(t);
                if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                    return true;
                }
            }
            this.RewindTo(t);
            return false;
        }
        this.RewindTo(t);
        return false;
    }
    // 2959
    ParseFuncDef() {
        let node = this.CreateNode(scriptnode.eScriptNode.snFuncDef);
        // Allow keywords 'external' and 'shared' before 'interface'
        let t1 = this.GetToken();
        while (this.IdentifierIs(t1, tokendef.SHARED_TOKEN) ||
            this.IdentifierIs(t1, tokendef.EXTERNAL_TOKEN)) {
            this.RewindTo(t1);
            node.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            t1 = this.GetToken();
        }
        if (t1.type != tokendef.eTokenType.ttFuncDef) {
            this.Error(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttFuncDef), t1);
            return node;
        }
        node.SetToken(t1);
        node.AddChildLast(this.ParseType(true));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseTypeMod(false));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseParameterList());
        if (this.isSyntaxError)
            return node;
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEndStatement)), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 3011
    ParseFunction(isMethod = false) {
        let node = this.CreateNode(scriptnode.eScriptNode.snFunction);
        let t1 = this.GetToken();
        if (!isMethod) {
            // A global function can be marked as shared and external
            while (t1.type == tokendef.eTokenType.ttIdentifier) {
                if (this.IdentifierIs(t1, tokendef.SHARED_TOKEN) ||
                    this.IdentifierIs(t1, tokendef.EXTERNAL_TOKEN)) {
                    this.RewindTo(t1);
                    node.AddChildLast(this.ParseIdentifier());
                    if (this.isSyntaxError)
                        return node;
                }
                else {
                    break;
                }
                t1 = this.GetToken();
            }
        }
        // A class method can start with 'private' or 'protected'
        if (isMethod && t1.type == tokendef.eTokenType.ttPrivate) {
            this.RewindTo(t1);
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttPrivate));
            t1 = this.GetToken();
        }
        else if (isMethod && t1.type == tokendef.eTokenType.ttProtected) {
            this.RewindTo(t1);
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttProtected));
            t1 = this.GetToken();
        }
        if (this.isSyntaxError)
            return node;
        // If it is a global function, or a method, except constructor and destructor, then the return type is parsed
        let t2 = this.GetToken();
        this.RewindTo(t1);
        if (!isMethod ||
            (t1.type != tokendef.eTokenType.ttBitNot &&
                t2.type != tokendef.eTokenType.ttOpenParanthesis)) {
            node.AddChildLast(this.ParseType(true));
            if (this.isSyntaxError)
                return node;
            node.AddChildLast(this.ParseTypeMod(false));
            if (this.isSyntaxError)
                return node;
        }
        // If this is a class destructor then it starts with ~, and no return type is declared
        if (isMethod && t1.type == tokendef.eTokenType.ttBitNot) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttBitNot));
            if (this.isSyntaxError)
                return node;
        }
        node.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseParameterList());
        if (this.isSyntaxError)
            return node;
        if (isMethod) {
            t1 = this.GetToken();
            this.RewindTo(t1);
            // Is the method a const?
            if (t1.type == tokendef.eTokenType.ttConst)
                node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttConst));
        }
        // TODO: Should support abstract methods, in which case no statement block should be provided
        this.ParseMethodAttributes(node);
        if (this.isSyntaxError)
            return node;
        // External shared functions must be ended with ';'
        t1 = this.GetToken();
        this.RewindTo(t1);
        if (t1.type == tokendef.eTokenType.ttEndStatement) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttEndStatement));
            return node;
        }
        // We should just find the end of the statement block here. The statements
        // will be parsed on request by the compiler once it starts the compilation.
        node.AddChildLast(this.SuperficiallyParseStatementBlock());
        return node;
    }
    // 3109
    ParseInterfaceMethod() {
        let node = this.CreateNode(scriptnode.eScriptNode.snFunction);
        node.AddChildLast(this.ParseType(true));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseTypeMod(false));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseParameterList());
        if (this.isSyntaxError)
            return node;
        // Parse an optional const after the method definition
        let t1 = this.GetToken();
        this.RewindTo(t1);
        if (t1.type == tokendef.eTokenType.ttConst) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttConst));
        }
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(';'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    ParseVirtualPropertyDecl(isMethod, isInterface) {
        let node = this.CreateNode(scriptnode.eScriptNode.snVirtualProperty);
        let t1 = this.GetToken();
        // unused variable: let t2 = this.GetToken();
        this.GetToken();
        this.RewindTo(t1);
        // A class method can start with 'private' or 'protected'
        if (isMethod && t1.type == tokendef.eTokenType.ttPrivate) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttPrivate));
        }
        else if (isMethod && t1.type == tokendef.eTokenType.ttProtected) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttProtected));
        }
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseType(true));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseTypeMod(false));
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseIdentifier());
        if (this.isSyntaxError)
            return node;
        t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        for (;;) {
            t1 = this.GetToken();
            let accessorNode = null;
            if (this.IdentifierIs(t1, tokendef.GET_TOKEN) ||
                this.IdentifierIs(t1, tokendef.SET_TOKEN)) {
                accessorNode = this.CreateNode(scriptnode.eScriptNode.snVirtualProperty);
                node.AddChildLast(accessorNode);
                this.RewindTo(t1);
                accessorNode.AddChildLast(this.ParseIdentifier());
                if (isMethod) {
                    t1 = this.GetToken();
                    this.RewindTo(t1);
                    if (t1.type == tokendef.eTokenType.ttConst) {
                        accessorNode.AddChildLast(this.ParseToken(tokendef.eTokenType.ttConst));
                    }
                    if (!isInterface) {
                        this.ParseMethodAttributes(accessorNode);
                        if (this.isSyntaxError)
                            return node;
                    }
                }
                if (!isInterface) {
                    t1 = this.GetToken();
                    if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                        this.RewindTo(t1);
                        accessorNode.AddChildLast(this.SuperficiallyParseStatementBlock());
                        if (this.isSyntaxError)
                            return node;
                    }
                    else if (t1.type != tokendef.eTokenType.ttEndStatement) {
                        this.Error(this.ExpectedTokens(';', '{'), t1);
                        this.Error(this.InsteadFound(t1), t1);
                        return node;
                    }
                }
                else {
                    t1 = this.GetToken();
                    if (t1.type != tokendef.eTokenType.ttEndStatement) {
                        this.Error(this.ExpectedToken(';'), t1);
                        this.Error(this.InsteadFound(t1), t1);
                        return node;
                    }
                }
            }
            else if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                break;
            }
            else {
                const tokens = [
                    tokendef.GET_TOKEN,
                    tokendef.SET_TOKEN,
                    tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttEndStatementBlock),
                ];
                this.Error(this.ExpectedOneOf(tokens, 3), t1);
                this.Error(this.InsteadFound(t1), t1);
                return node;
            }
        }
        return node;
    }
    // 3252
    ParseInterface() {
        let node = this.CreateNode(scriptnode.eScriptNode.snInterface);
        // Allow keywords 'external' and 'shared' before 'interface'
        let t = this.GetToken();
        while (this.IdentifierIs(t, tokendef.SHARED_TOKEN) ||
            this.IdentifierIs(t, tokendef.EXTERNAL_TOKEN)) {
            this.RewindTo(t);
            node.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            t = this.GetToken();
        }
        if (t.type != tokendef.eTokenType.ttInterface) {
            this.Error(this.ExpectedToken('interface'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        node.AddChildLast(this.ParseIdentifier());
        // External shared declarations are ended with ';'
        t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttEndStatement) {
            this.RewindTo(t);
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttEndStatement));
            return node;
        }
        // Can optionally have a list of interfaces that are inherited
        if (t.type == tokendef.eTokenType.ttColon) {
            let inherit = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
            node.AddChildLast(inherit);
            this.ParseOptionalScope(inherit);
            inherit.AddChildLast(this.ParseIdentifier());
            t = this.GetToken();
            while (t.type == tokendef.eTokenType.ttListSeparator) {
                inherit = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
                node.AddChildLast(inherit);
                this.ParseOptionalScope(inherit);
                inherit.AddChildLast(this.ParseIdentifier());
                t = this.GetToken();
            }
        }
        if (t.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        // Parse interface methods
        t = this.GetToken();
        this.RewindTo(t);
        while (t.type != tokendef.eTokenType.ttEndStatementBlock &&
            t.type != tokendef.eTokenType.ttEnd) {
            if (this.IsVirtualPropertyDecl()) {
                node.AddChildLast(this.ParseVirtualPropertyDecl(true, true));
            }
            else if (t.type == tokendef.eTokenType.ttEndStatement) {
                // Skip empty declarations
                t = this.GetToken();
            }
            else {
                // Parse the method signature
                node.AddChildLast(this.ParseInterfaceMethod());
            }
            if (this.isSyntaxError)
                return node;
            t = this.GetToken();
            this.RewindTo(t);
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatementBlock) {
            this.Error(this.ExpectedToken('}'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    ParseMixin() {
        let node = this.CreateNode(scriptnode.eScriptNode.snMixin);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttMixin) {
            this.Error(this.ExpectedToken('mixin'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        // A mixin token must be followed by a class declaration
        node.AddChildLast(this.ParseClass());
        return node;
    }
    // 3375
    ParseClass() {
        let node = this.CreateNode(scriptnode.eScriptNode.snClass);
        let t = this.GetToken();
        // Allow the keywords 'shared', 'abstract', 'final', and 'external' before 'class'
        while (this.IdentifierIs(t, tokendef.SHARED_TOKEN) ||
            this.IdentifierIs(t, tokendef.ABSTRACT_TOKEN) ||
            this.IdentifierIs(t, tokendef.FINAL_TOKEN) ||
            this.IdentifierIs(t, tokendef.EXTERNAL_TOKEN)) {
            this.RewindTo(t);
            node.AddChildLast(this.ParseIdentifier());
            t = this.GetToken();
        }
        if (t.type != tokendef.eTokenType.ttClass) {
            this.Error(this.ExpectedToken('class'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.SetToken(t);
        if (this.config.ep.allowImplicitHandleTypes) {
            // Parse 'implicit handle class' construct
            t = this.GetToken();
            if (t.type == tokendef.eTokenType.ttHandle) {
                node.SetToken(t);
            }
            else {
                this.RewindTo(t);
            }
        }
        node.AddChildLast(this.ParseIdentifier());
        // External shared declarations are ended with ';'
        t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttEndStatement) {
            this.RewindTo(t);
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttEndStatement));
            return node;
        }
        // Optional list of interfaces that are being implemented and classes that are being inherited
        if (t.type == tokendef.eTokenType.ttColon) {
            let inherit = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
            node.AddChildLast(inherit);
            this.ParseOptionalScope(inherit);
            inherit.AddChildLast(this.ParseIdentifier());
            t = this.GetToken();
            while (t.type == tokendef.eTokenType.ttListSeparator) {
                inherit = this.CreateNode(scriptnode.eScriptNode.snIdentifier);
                node.AddChildLast(inherit);
                this.ParseOptionalScope(inherit);
                inherit.AddChildLast(this.ParseIdentifier());
                t = this.GetToken();
            }
        }
        if (t.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        // Parse properties
        t = this.GetToken();
        this.RewindTo(t);
        while (t.type != tokendef.eTokenType.ttEndStatementBlock &&
            t.type != tokendef.eTokenType.ttEnd) {
            // Is it a property or a method?
            if (t.type == tokendef.eTokenType.ttFuncDef) {
                node.AddChildLast(this.ParseFuncDef());
            }
            else if (this.IsFuncDecl(true)) {
                node.AddChildLast(this.ParseFunction(true));
            }
            else if (this.IsVirtualPropertyDecl()) {
                node.AddChildLast(this.ParseVirtualPropertyDecl(true, false));
            }
            else if (this.IsVarDecl()) {
                node.AddChildLast(this.ParseDeclaration(true));
            }
            else if (t.type == tokendef.eTokenType.ttEndStatement) {
                // Skip empty declarations
                t = this.GetToken();
            }
            else {
                this.Error(texts.TXT_EXPECTED_METHOD_OR_PROPERTY, t);
                this.Error(this.InsteadFound(t), t);
                return node;
            }
            if (this.isSyntaxError) {
                return node;
            }
            t = this.GetToken();
            this.RewindTo(t);
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatementBlock) {
            this.Error(this.ExpectedToken('}'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 3495
    ParseVarInit(in_script, in_init) {
        this.Reset();
        // Tell the parser to validate the identifiers as valid types
        this.checkValidTypes = true;
        this.script = in_script;
        this.sourcePos = in_init.tokenPos;
        // If next token is assignment, parse expression
        let t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttAssignment) {
            t = this.GetToken();
            this.RewindTo(t);
            if (t.type == tokendef.eTokenType.ttStartStatementBlock) {
                this.scriptNode = this.ParseInitList();
            }
            else {
                this.scriptNode = this.ParseAssignment();
            }
        }
        else if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
            this.RewindTo(t);
            this.scriptNode = this.ParseArgList();
        }
        else {
            const tokens = [
                tokendef.eTokenType.ttAssignment,
                tokendef.eTokenType.ttOpenParanthesis,
            ];
            this.Error(this.ExpectedOneOf(tokens, 2), t);
            this.Error(this.InsteadFound(t), t);
        }
        // Don't allow any more tokens after the expression
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEnd &&
            t.type != tokendef.eTokenType.ttEndStatement &&
            t.type != tokendef.eTokenType.ttListSeparator &&
            t.type != tokendef.eTokenType.ttEndStatementBlock) {
            let msg = format(texts.TXT_UNEXPECTED_TOKEN_s, tokenizer.asCTokenizer.GetDefinition(t.type));
            this.Error(msg, t);
        }
        if (this.isSyntaxError || this.errorWhileParsing) {
            return -1;
        }
        return 0;
    }
    // 3544
    SuperficiallyParseVarInit() {
        let node = this.CreateNode(scriptnode.eScriptNode.snAssignment);
        let t = this.GetToken();
        node.UpdateSourcePos(t.pos, t.length);
        if (t.type == tokendef.eTokenType.ttAssignment) {
            t = this.GetToken();
            let start = t;
            // Find the end of the expression
            let indentParan = 0;
            let indentBrace = 0;
            while (indentParan ||
                indentBrace ||
                (t.type != tokendef.eTokenType.ttListSeparator &&
                    t.type != tokendef.eTokenType.ttEndStatement &&
                    t.type != tokendef.eTokenType.ttEndStatementBlock)) {
                if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
                    indentParan++;
                }
                else if (t.type == tokendef.eTokenType.ttCloseParanthesis) {
                    indentParan--;
                }
                else if (t.type == tokendef.eTokenType.ttStartStatementBlock) {
                    indentBrace++;
                }
                else if (t.type == tokendef.eTokenType.ttEndStatementBlock) {
                    indentBrace--;
                }
                else if (t.type == tokendef.eTokenType.ttNonTerminatedStringConstant) {
                    this.Error(texts.TXT_NONTERMINATED_STRING, t);
                    break;
                }
                else if (t.type == tokendef.eTokenType.ttEnd) {
                    this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t);
                    this.Info(texts.TXT_WHILE_PARSING_EXPRESSION, start);
                    break;
                }
                t = this.GetToken();
            }
            // Rewind so that the next token read is the list separator, end statement, or end statement block
            this.RewindTo(t);
        }
        else if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
            let start = t;
            // Find the end of the argument list
            let indent = 1;
            while (indent) {
                t = this.GetToken();
                if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
                    indent++;
                }
                else if (t.type == tokendef.eTokenType.ttCloseParanthesis) {
                    indent--;
                }
                else if (t.type == tokendef.eTokenType.ttNonTerminatedStringConstant) {
                    this.Error(texts.TXT_NONTERMINATED_STRING, t);
                    break;
                }
                else if (t.type == tokendef.eTokenType.ttEnd) {
                    this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t);
                    this.Info(texts.TXT_WHILE_PARSING_ARG_LIST, start);
                    break;
                }
            }
        }
        else {
            const tokens = [
                tokendef.eTokenType.ttAssignment,
                tokendef.eTokenType.ttOpenParanthesis,
            ];
            this.Error(this.ExpectedOneOf(tokens, 2), t);
            this.Error(this.InsteadFound(t), t);
        }
        return node;
    }
    // 3624
    SuperficiallyParseStatementBlock() {
        let node = this.CreateNode(scriptnode.eScriptNode.snStatementBlock);
        // This function will only superficially parse the statement block in order to find the end of it
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        let start = t1;
        let level = 1;
        while (level > 0 && !this.isSyntaxError) {
            t1 = this.GetToken();
            if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                level--;
            }
            else if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                level++;
            }
            else if (t1.type == tokendef.eTokenType.ttNonTerminatedStringConstant) {
                this.Error(texts.TXT_NONTERMINATED_STRING, t1);
                break;
            }
            else if (t1.type == tokendef.eTokenType.ttEnd) {
                this.Error(texts.TXT_UNEXPECTED_END_OF_FILE, t1);
                this.Info(texts.TXT_WHILE_PARSING_STATEMENT_BLOCK, start);
                break;
            }
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        return node;
    }
    // 3754
    ParseInitList() {
        let node = this.CreateNode(scriptnode.eScriptNode.snInitList);
        let t1 = this.GetToken();
        if (t1.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t1);
            this.Error(this.InsteadFound(t1), t1);
            return node;
        }
        node.UpdateSourcePos(t1.pos, t1.length);
        t1 = this.GetToken();
        if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
            node.UpdateSourcePos(t1.pos, t1.length);
            // Statement block is finished
            return node;
        }
        else {
            this.RewindTo(t1);
            for (;;) {
                t1 = this.GetToken();
                if (t1.type == tokendef.eTokenType.ttListSeparator) {
                    // No expression
                    node.AddChildLast(this.CreateNode(scriptnode.eScriptNode.snUndefined));
                    if (node.lastChild) {
                        node.lastChild.UpdateSourcePos(t1.pos, 1);
                    }
                    t1 = this.GetToken();
                    if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                        // No expression
                        node.AddChildLast(this.CreateNode(scriptnode.eScriptNode.snUndefined));
                        if (node.lastChild) {
                            node.lastChild.UpdateSourcePos(t1.pos, 1);
                        }
                        node.UpdateSourcePos(t1.pos, t1.length);
                        return node;
                    }
                    this.RewindTo(t1);
                }
                else if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                    // No expression
                    node.AddChildLast(this.CreateNode(scriptnode.eScriptNode.snUndefined));
                    if (node.lastChild) {
                        node.lastChild.UpdateSourcePos(t1.pos, 1);
                    }
                    node.UpdateSourcePos(t1.pos, t1.length);
                    // Statement block is finished
                    return node;
                }
                else if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
                    this.RewindTo(t1);
                    node.AddChildLast(this.ParseInitList());
                    if (this.isSyntaxError)
                        return node;
                    t1 = this.GetToken();
                    if (t1.type == tokendef.eTokenType.ttListSeparator) {
                        continue;
                    }
                    else if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                        node.UpdateSourcePos(t1.pos, t1.length);
                        // Statement block is finished
                        return node;
                    }
                    else {
                        this.Error(this.ExpectedTokens('}', ','), t1);
                        this.Error(this.InsteadFound(t1), t1);
                        return node;
                    }
                }
                else {
                    this.RewindTo(t1);
                    node.AddChildLast(this.ParseAssignment());
                    if (this.isSyntaxError)
                        return node;
                    t1 = this.GetToken();
                    if (t1.type == tokendef.eTokenType.ttListSeparator) {
                        continue;
                    }
                    else if (t1.type == tokendef.eTokenType.ttEndStatementBlock) {
                        node.UpdateSourcePos(t1.pos, t1.length);
                        // Statement block is finished
                        return node;
                    }
                    else {
                        this.Error(this.ExpectedTokens('}', ','), t1);
                        this.Error(this.InsteadFound(t1), t1);
                        return node;
                    }
                }
            }
        }
    }
    // 3865
    ParseDeclaration(isClassProp = false, isGlobalVar = false) {
        let node = this.CreateNode(scriptnode.eScriptNode.snDeclaration);
        let t = this.GetToken();
        this.RewindTo(t);
        // A class property can be preceeded by private
        if (t.type == tokendef.eTokenType.ttPrivate && isClassProp) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttPrivate));
        }
        else if (t.type == tokendef.eTokenType.ttProtected && isClassProp) {
            node.AddChildLast(this.ParseToken(tokendef.eTokenType.ttProtected));
        }
        // Parse data type
        node.AddChildLast(this.ParseType(true, false, !isClassProp));
        if (this.isSyntaxError)
            return node;
        for (;;) {
            // Parse identifier
            node.AddChildLast(this.ParseIdentifier());
            if (this.isSyntaxError)
                return node;
            if (isClassProp || isGlobalVar) {
                // Only superficially parse the initialization info for the class property
                t = this.GetToken();
                this.RewindTo(t);
                if (t.type == tokendef.eTokenType.ttAssignment ||
                    t.type == tokendef.eTokenType.ttOpenParanthesis) {
                    node.AddChildLast(this.SuperficiallyParseVarInit());
                    if (this.isSyntaxError)
                        return node;
                }
            }
            else {
                // If next token is assignment, parse expression
                t = this.GetToken();
                if (t.type == tokendef.eTokenType.ttOpenParanthesis) {
                    this.RewindTo(t);
                    node.AddChildLast(this.ParseArgList());
                    if (this.isSyntaxError)
                        return node;
                }
                else if (t.type == tokendef.eTokenType.ttAssignment) {
                    t = this.GetToken();
                    this.RewindTo(t);
                    if (t.type == tokendef.eTokenType.ttStartStatementBlock) {
                        node.AddChildLast(this.ParseInitList());
                        if (this.isSyntaxError)
                            return node;
                    }
                    else {
                        node.AddChildLast(this.ParseAssignment());
                        if (this.isSyntaxError)
                            return node;
                    }
                }
                else {
                    this.RewindTo(t);
                }
            }
            // continue if list separator, else terminate with end statement
            t = this.GetToken();
            if (t.type == tokendef.eTokenType.ttListSeparator) {
                continue;
            }
            else if (t.type == tokendef.eTokenType.ttEndStatement) {
                node.UpdateSourcePos(t.pos, t.length);
                return node;
            }
            else {
                this.Error(this.ExpectedTokens(',', ';'), t);
                this.Error(this.InsteadFound(t), t);
                return node;
            }
        }
    }
    // 3951
    ParseStatement() {
        const t1 = this.GetToken();
        this.RewindTo(t1);
        if (t1.type == tokendef.eTokenType.ttIf) {
            return this.ParseIf();
        }
        else if (t1.type == tokendef.eTokenType.ttFor) {
            return this.ParseFor();
        }
        else if (t1.type == tokendef.eTokenType.ttWhile) {
            return this.ParseWhile();
        }
        else if (t1.type == tokendef.eTokenType.ttReturn) {
            return this.ParseReturn();
        }
        else if (t1.type == tokendef.eTokenType.ttStartStatementBlock) {
            return this.ParseStatementBlock();
        }
        else if (t1.type == tokendef.eTokenType.ttBreak) {
            return this.ParseBreak();
        }
        else if (t1.type == tokendef.eTokenType.ttContinue) {
            return this.ParseContinue();
        }
        else if (t1.type == tokendef.eTokenType.ttDo) {
            return this.ParseDoWhile();
        }
        else if (t1.type == tokendef.eTokenType.ttSwitch) {
            return this.ParseSwitch();
        }
        else if (t1.type == tokendef.eTokenType.ttTry) {
            return this.ParseTryCatch();
        }
        else {
            if (this.IsVarDecl()) {
                this.Error(texts.TXT_UNEXPECTED_VAR_DECL, t1);
                return null;
            }
            return this.ParseExpressionStatement();
        }
    }
    // 3990
    ParseExpressionStatement() {
        let node = this.CreateNode(scriptnode.eScriptNode.snExpressionStatement);
        let t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttEndStatement) {
            node.UpdateSourcePos(t.pos, t.length);
            return node;
        }
        this.RewindTo(t);
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(';'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    ParseSwitch() {
        let node = this.CreateNode(scriptnode.eScriptNode.snSwitch);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttSwitch) {
            this.Error(this.ExpectedToken('switch'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.Error(this.ExpectedToken(')'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttStartStatementBlock) {
            this.Error(this.ExpectedToken('{'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        while (!this.isSyntaxError) {
            t = this.GetToken();
            if (t.type == tokendef.eTokenType.ttEndStatementBlock) {
                break;
            }
            this.RewindTo(t);
            if (t.type != tokendef.eTokenType.ttCase && t.type != tokendef.eTokenType.ttDefault) {
                const tokens = ['case', 'default'];
                this.Error(this.ExpectedOneOf(tokens, 2), t);
                this.Error(this.InsteadFound(t), t);
                return node;
            }
            node.AddChildLast(this.ParseCase());
            if (this.isSyntaxError)
                return node;
        }
        if (t.type != tokendef.eTokenType.ttEndStatementBlock) {
            this.Error(this.ExpectedToken('}'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        return node;
    }
    // 4098
    ParseCase() {
        let node = this.CreateNode(scriptnode.eScriptNode.snCase);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCase && t.type != tokendef.eTokenType.ttDefault) {
            this.Error(this.ExpectedTokens('case', 'default'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        if (t.type == tokendef.eTokenType.ttCase) {
            node.AddChildLast(this.ParseExpression());
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttColon) {
            this.Error(this.ExpectedToken(':'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        // Parse statements until we find either of }, case, default, and break
        t = this.GetToken();
        this.RewindTo(t);
        while (t.type != tokendef.eTokenType.ttCase &&
            t.type != tokendef.eTokenType.ttDefault &&
            t.type != tokendef.eTokenType.ttEndStatementBlock &&
            t.type != tokendef.eTokenType.ttBreak) {
            if (this.IsVarDecl()) {
                // Variable declarations are not allowed, but we parse it anyway to give a good error message
                node.AddChildLast(this.ParseDeclaration());
            }
            else {
                const tmp = this.ParseStatement();
                if (tmp) {
                    node.AddChildLast(tmp);
                }
            }
            if (this.isSyntaxError)
                return node;
            t = this.GetToken();
            this.RewindTo(t);
        }
        // If the case was ended with a break statement, add it to the node
        if (t.type == tokendef.eTokenType.ttBreak) {
            node.AddChildLast(this.ParseBreak());
        }
        return node;
    }
    // 4154
    ParseIf() {
        let node = this.CreateNode(scriptnode.eScriptNode.snIf);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttIf) {
            this.Error(this.ExpectedToken('if'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.Error(this.ExpectedToken(')'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        let tmp = this.ParseStatement();
        if (tmp) {
            node.AddChildLast(tmp);
        }
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttElse) {
            // No else statement return already
            this.RewindTo(t);
            return node;
        }
        tmp = this.ParseStatement();
        if (tmp) {
            node.AddChildLast(tmp);
        }
        return node;
    }
    //  4206
    ParseTryCatch() {
        let node = this.CreateNode(scriptnode.eScriptNode.snTryCatch);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttTry) {
            this.Error(this.ExpectedToken('try'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        node.AddChildLast(this.ParseStatementBlock());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCatch) {
            this.Error(this.ExpectedToken('catch'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.AddChildLast(this.ParseStatementBlock());
        if (this.isSyntaxError)
            return node;
        return node;
    }
    // 4240
    ParseFor() {
        let node = this.CreateNode(scriptnode.eScriptNode.snFor);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttFor) {
            this.Error(this.ExpectedToken('for'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        if (this.IsVarDecl()) {
            node.AddChildLast(this.ParseDeclaration());
        }
        else {
            node.AddChildLast(this.ParseExpressionStatement());
        }
        if (this.isSyntaxError)
            return node;
        node.AddChildLast(this.ParseExpressionStatement());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.RewindTo(t);
            // Parse N increment statements separated by ,
            for (;;) {
                const n = this.CreateNode(scriptnode.eScriptNode.snExpressionStatement);
                node.AddChildLast(n);
                n.AddChildLast(this.ParseAssignment());
                if (this.isSyntaxError)
                    return node;
                t = this.GetToken();
                if (t.type == tokendef.eTokenType.ttListSeparator) {
                    continue;
                }
                else if (t.type == tokendef.eTokenType.ttCloseParanthesis) {
                    break;
                }
                else {
                    const tokens = [',', ')'];
                    this.Error(this.ExpectedOneOf(tokens, 2), t);
                    this.Error(this.InsteadFound(t), t);
                    return node;
                }
            }
        }
        const tmp = this.ParseStatement();
        if (tmp) {
            node.AddChildLast(tmp);
        }
        return node;
    }
    // 4308
    ParseWhile() {
        let node = this.CreateNode(scriptnode.eScriptNode.snWhile);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttWhile) {
            this.Error(this.ExpectedToken('while'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.Error(this.ExpectedToken(')'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        const tmp = this.ParseStatement();
        if (tmp) {
            node.AddChildLast(tmp);
        }
        return node;
    }
    // 4349
    ParseDoWhile() {
        let node = this.CreateNode(scriptnode.eScriptNode.snDoWhile);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttDo) {
            this.Error(this.ExpectedToken('do'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        const tmp = this.ParseStatement();
        if (tmp) {
            node.AddChildLast(tmp);
        }
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttWhile) {
            this.Error(this.ExpectedToken('while'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttOpenParanthesis) {
            this.Error(this.ExpectedToken('('), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttCloseParanthesis) {
            this.Error(this.ExpectedToken(')'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(';'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 4408
    ParseReturn() {
        let node = this.CreateNode(scriptnode.eScriptNode.snReturn);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttReturn) {
            this.Error(this.ExpectedToken('return'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type == tokendef.eTokenType.ttEndStatement) {
            node.UpdateSourcePos(t.pos, t.length);
            return node;
        }
        this.RewindTo(t);
        node.AddChildLast(this.ParseAssignment());
        if (this.isSyntaxError)
            return node;
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(';'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 4450
    ParseBreak() {
        let node = this.CreateNode(scriptnode.eScriptNode.snBreak);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttBreak) {
            this.Error(this.ExpectedToken('break'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(';'), t);
            this.Error(this.InsteadFound(t), t);
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    ParseContinue() {
        let node = this.CreateNode(scriptnode.eScriptNode.snContinue);
        let t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttContinue) {
            this.Error(this.ExpectedToken('continue'), t);
            this.Error(this.InsteadFound(t), t);
            return node;
        }
        node.UpdateSourcePos(t.pos, t.length);
        t = this.GetToken();
        if (t.type != tokendef.eTokenType.ttEndStatement) {
            this.Error(this.ExpectedToken(';'), t);
            this.Error(this.InsteadFound(t), t);
        }
        node.UpdateSourcePos(t.pos, t.length);
        return node;
    }
    // 4509
    ParseTypedef() {
        // Create the typedef node
        let node = this.CreateNode(scriptnode.eScriptNode.snTypedef);
        let token = this.GetToken();
        if (token.type != tokendef.eTokenType.ttTypedef) {
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(tokendef.eTokenType.ttTypedef)), token);
            this.Error(this.InsteadFound(token), token);
            return node;
        }
        node.SetToken(token);
        node.UpdateSourcePos(token.pos, token.length);
        // Parse the base type
        token = this.GetToken();
        this.RewindTo(token);
        // Make sure it is a primitive type (except ttVoid)
        if (!this.IsRealType(token.type) || token.type == tokendef.eTokenType.ttVoid) {
            const str = format(texts.TXT_UNEXPECTED_TOKEN_s, tokenizer.asCTokenizer.GetDefinition(token.type));
            this.Error(str, token);
            return node;
        }
        node.AddChildLast(this.ParseRealType());
        node.AddChildLast(this.ParseIdentifier());
        // Check for the end of the typedef
        token = this.GetToken();
        if (token.type != tokendef.eTokenType.ttEndStatement) {
            this.RewindTo(token);
            this.Error(this.ExpectedToken(tokenizer.asCTokenizer.GetDefinition(token.type)), token);
            this.Error(this.InsteadFound(token), token);
        }
        return node;
    }
}
exports.asCParser = asCParser;

});

var source = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(parser, exports);
__exportStar(scriptcode, exports);
__exportStar(scriptnode, exports);
__exportStar(texts, exports);
__exportStar(tokendef, exports);
__exportStar(tokenizer, exports);

});

var asCParser = source.asCParser;
var asCScriptCode = source.asCScriptCode;
var asCTokenizer = source.asCTokenizer;
var eScriptNode = source.eScriptNode;
export { asCParser, asCScriptCode, asCTokenizer, eScriptNode };
