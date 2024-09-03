<template>
    <div class="role-management">
        <div class="top">
            <div class="left">
                <h1>按钮权限控制(方案一)</h1>
                <p class="desc">
                    方案一:对于按钮的权限控制我们最终落地到按钮的本身，这种只是适用于单个页面中某个按钮的权限控制，我们将通过自定义指令的方式实现！
                </p>
                <p class="desc">
                    缺点:我们使用自定义指令的方式实现按钮的权限控制我们只是实现了控制，试想一下如果对于一个页面中的某个组件我们都不想展示呢，比如当前页面中有些敏感数据，你只是对其实现了权限展示本质上还是暴露了数据，这显然是不合理的！
                    换句话说，如果我们控制了组件中的某个组件不展示，那么我们直接就控制了组件整个组件不会渲染，他也就不会走到组件的mounted，该组件不会渲染也就不会请求数据，就避免了敏感操作！
                </p>
                <div class="leftcontroller">
                    <div v-permission1="'add'" class="add">新增</div>
                    <div v-permission1="'edit'" class="edit">编辑</div>
                    <div v-permission1="'delete'" class="delete">删除</div>
                </div>
            </div>
            <div class="right">
                <h1>按钮权限控制(方案二【演示BUG】)</h1>
                <p class="desc">
                    BUG:打开控制台你会发现，box1和box2无论显示还是隐藏都会走到mounted钩子函数中，这显然是不合理的！
                </p>
                <!-- 使用传统的自定义指令的方式去屏蔽控制组件 -->
                <div class="rightcontroller">
                    <box1 v-permission1="'box1'"></box1>
                    <box2 v-permission1="'box2'"></box2>
                </div>
            </div>
        </div>
        <div class="bottom">
            <h1>按钮权限控制(方案三)</h1>
            <p class="desc">
               使用这种方式我们可以发现，整个组件都销毁了对于铭感数据我们不会请求，减轻了服务器的压力，但是提高了耦合度，所以看情况而定方案吧！
            </p>
            <!-- 这里我们传递一个props只有admin用户才会显示这个机密组件 这里就是写死了 只有admin才能看 -->
            <!-- 使用 -->
            <Authority authority="admin">
                <box1></box1>
            </Authority>
            <box2></box2>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePermissionDirective } from "../utils/usePermissionDirective1";
import box1 from './permission2Cpns/box1.vue';
import box2 from './permission2Cpns/box2.vue';
import Authority from './permission2Cpns/Authority.vue';

// 方案一：假设用户权限列表
const userPermissions = ref(['add', "box1", "box2"]);
// 调用钩子函数来注册指令
usePermissionDirective(userPermissions.value);
</script>
<style scoped lang="scss">
.role-management {
    width: 100%;
    display: flex;
    flex-direction: column;

    .top {
        width: 100%;
        display: flex;
    }

    .bottom {
        width: 100%;
        padding: 20px;
        border-radius: 5px;
        border: 1px solid #ccc;

        .desc {
            width: 70%;
            text-indent: 2em;
            margin-top: 20px;
        }
    }

    .left,
    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;

        .desc {
            width: 70%;
            text-indent: 2em;
            margin-top: 20px;
        }
    }

    .leftcontroller {
        display: flex;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 20px;

        div {
            width: 120px;
            height: 40px;
            border-radius: 20px;
            background-color: #4CAF50;
            margin: 10px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px #999;
            transition: 0.3s;

            &:hover {
                background-color: #45a049;
            }

            &:active {
                background-color: #3e8e41;
                box-shadow: 0 2px #666;
                transform: translateY(2px);
            }
        }
    }

    .rightcontroller {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 200px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-top: 20px;
    }
}
</style>