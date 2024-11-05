function f_Or_Excel(...conditions) {
    // Return true if any of the conditions is true
    return conditions.some(condition => condition);
}
function f_If_Excel(condition, trueResult, falseResult) {
    return condition ? trueResult : falseResult;
}
function f_And_Excel(...conditions) {
    // Return true if all conditions are true
    return conditions.every(condition => condition);
}