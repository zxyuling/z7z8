define(function(require,exports,module)
{
    var EventUtil = 
        {
            addEvent         : addEvent,
            removeEvent      : removeEvent,
            getEvent         : getEvent,
            getTarget        : getTarget,
            preventDefault   : preventDefault,
            stopPropagation  : stopPropagation,
            delegate         : delegate,
            nodeIndex        : nodeIndex
        }
     module.exports = EventUtil;
    /*
    *   事件绑定api
    *   element:事件绑定的目标
    *   e:事件类型，如onclick
    *   handler:事件触发执行函数
    *   type：flase捕获阶段执行，true冒泡阶段执行
    */
    function addEvent(element,e,handler,type)
        {
            if(typeof window.addEventListener === 'function')//非ie浏览器绑定事件
                {
                    element.addEventListener(e,handler,type);
                }
            else
                {
                    e='on'+e;
                    element.attachEvent(e,handler);
                }
         }

    /*****************************************************************************************************/

    /*
    *   事件解除api
    *   element:事件绑定的目标
    *   e:事件类型，如onclick
    *   handler:事件触发执行函数
    *   type：flase捕获阶段执行，true冒泡阶段执行
    */
    function removeEvent(element,e,handler,type)
    {

        if(typeof window.addEventListener === 'function')//非ie浏览器解除事件
        {
            element.removeEventListener(e,handler,type);
        }
        else
        {
            e='on'+e;
            element.detachEvent(e,handler);
        }
    }

    /*****************************************************************************************************/

    /*
    *   返回event
    */
    function getEvent(event)
    {
        if(typeof window.addEventListener === 'function')//非ie浏览器解除事件
        {
            return event;
        }
        else
        {
            return window.event;
        }
    }




    /*
    *   返回事件目标
    */
    function getTarget(e)
    {
        if(typeof window.addEventListener === 'function')//非ie浏览器解除事件
        {
            return e.target;
        }
        else
        {
            return e.srcElement;
        }   
    }

    /*****************************************************************************************************/

    /*
    *   阻止浏览器默认行为
    */

    function preventDefault(e)
    {
        if(typeof window.addEventListener === 'function')//非ie浏览器解除事件
        {
            e.preventDefault();
        }
        else
        {
             window.event.returnValue=false;
        }  
    }

    /*****************************************************************************************************/

    /*
    *   阻止事件传播
    */

    function stopPropagation(e)
    {
        if(typeof window.addEventListener === 'function')//非ie浏览器解除事件
        {
           event.stopPropagation(); 
        }
        else
        {
            window.event.cancelBubble = true; 
        } 
    }

    /**********************************************************************************************************/
    /**********************************************************************************************************/

    /*
    *   事件代理函数：superEl是代理元素，eventType是事件类型,el是被代理元素 callback是需要执行的操作
    */
    function delegate(superEl,eventType,el,callback)
    {
        addEvent(superEl,eventType,doSth,1);

        function doSth()
        {        
            var e = getEvent(event);
            var eventTarget = getTarget(e);
            if(eventTarget.tagName==el&&eventTarget.parentNode==superEl)
                 callback(eventTarget);
        }

        
    }
    /**********************************************************************************************************/

    /*
    *   计算节点在其父节点的索引位置
    */

    function nodeIndex(tar)
    {
        var childArr=tar.parentNode.children || tar.parentNode.childNodes
        for(var i=0;i<childArr.length;i++)
        {
            if(tar===childArr[i])
                return i;
        }
    }
    /**********************************************************************************************************/

})


