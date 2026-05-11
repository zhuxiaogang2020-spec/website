# 采蘑菇机械臂（概念阶段）

这是一个自动采蘑菇机械臂的概念项目，目前处于早期探索阶段。

演示网站：https://www.caelexten.com

# Mushroom Harvesting Robot (Concept Stage)

A concept project exploring an autonomous mushroom harvesting robot.

Demo website: https://www.caelexten.com

# 采蘑菇机械臂 · 概念演示

自动采蘑菇机械臂项目，目前处于概念阶段，用于展示整体流程与未来方向。

演示网站：https://www.caelexten.com

主要方向：
- 视觉识别
- 3D 位姿估计
- 路径规划
- 机械臂控制

arm/
 ├── vision/           # 视觉识别模型
 ├── calibration/      # 手眼标定
 ├── planning/         # 路径规划
 ├── control/          # 机械臂控制
 ├── gripper/          # 夹爪设计
 ├── docs/             # 文档与设计图
 └── README.md         # 项目说明


          ┌──────────────────────────┐
          │      深度相机 / RGBD     │
          └─────────────┬────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │  视觉识别模型     │
              │ Mushroom Detection│
              └─────────┬────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   3D 位姿估计     │
              │  Pose Estimation  │
              └─────────┬────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   路径规划模块     │
              │  Path Planning    │
              └─────────┬────────┘
                        │
                        ▼
              ┌──────────────────┐
              │   机械臂控制器     │
              │  Arm Controller   │
              └─────────┬────────┘
                        │
                        ▼
              ┌──────────────────┐
              │     夹爪执行器     │
              │     Gripper       │
              └──────────────────┘
