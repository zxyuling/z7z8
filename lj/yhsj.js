function Combination(m,n){  
    if(n == 0) return 1;  //每行第一个数为1  
    else if(m == n) return 1; //最后一个数为1  
    //其余都是相加而来   
    else return Combination(m-1,n-1)+Combination(m-1,n);  
}  
function Pascal(n){   //杨辉三角,N为行数   
    for( var i = 0 ; i < n ; i++ ){   //一共N行  
        for ( var j = 0 ; j <= i ; j++ ) {  //每行数字的个数即为行号、例如第1行1个数、第2行2个数  )
            if(i==n-1)
           console.log(Combination(i,j)+"  ");  
        }  
    }  
}  
var factorial = function factorial(i,a){
    a = a || 1;
    if(i<2){
        return a;
    }
    return factorial(i-1,a*i);
};
console.log(factorial(1000))
//Pascal(100)