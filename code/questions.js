/* 本文件由 code/build_questions.py 根据 doc/ 三份原始 Markdown 生成。 */
window.SURVEY_SECTIONS = [
  {
    "id": "s1",
    "name": "学习方面",
    "questions": [
      {
        "id": "s1q1",
        "number": 1,
        "title": "你认为目前哪些课程学习起来存在困难？",
        "type": "multi",
        "options": [
          "高等数学A（上）",
          "程序设计基础（C++）",
          "通用英语",
          "思想道德与法治",
          "军事理论",
          "形势与政策（1）",
          "大学生国家安全教育",
          "软件工程专业新生研讨课",
          "大学体育（1）",
          "大学生劳动教育",
          "软件工程认知实习",
          "其他",
          "暂无"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "暂无"
          ],
          "label": "请具体说明遇到的问题（必填）",
          "placeholder": "例如：哪部分听不懂、哪道题不会、希望怎样讲解……",
          "required_when_visible": true
        },
        "exclusive": [
          "暂无"
        ]
      },
      {
        "id": "s1q2",
        "number": 2,
        "title": "你认为上次生涯讲师分享学习方法没有听懂的地方有哪些科目？",
        "type": "multi",
        "options": [
          "高等数学A（上）",
          "程序设计基础（C++）",
          "通用英语",
          "思想道德与法治",
          "军事理论",
          "形势与政策（1）",
          "大学生国家安全教育",
          "软件工程专业新生研讨课",
          "大学体育（1）",
          "大学生劳动教育",
          "软件工程认知实习",
          "其他",
          "暂无"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "暂无"
          ],
          "label": "请具体说明遇到的问题（必填）",
          "placeholder": "例如：哪部分听不懂、哪道题不会、希望怎样讲解……",
          "required_when_visible": true
        },
        "exclusive": [
          "暂无"
        ]
      },
      {
        "id": "s1q3",
        "number": 3,
        "title": "针对程序设计基础（C++），你在以下哪些具体知识点上存在困难？",
        "type": "multi",
        "options": [
          "C++基础知识",
          "选择结构",
          "循环结构",
          "数组与字符串",
          "函数",
          "指针与引用",
          "结构体 struct 的定义与使用",
          "类与对象",
          "暂无"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "暂无"
          ],
          "label": "请具体说明遇到的问题（必填）",
          "placeholder": "例如：哪部分听不懂、哪道题不会、希望怎样讲解……",
          "required_when_visible": true
        },
        "exclusive": [
          "暂无"
        ]
      },
      {
        "id": "s1q4",
        "number": 4,
        "title": "在C++编程实践中，你主要存在哪些困难？",
        "type": "multi",
        "options": [
          "能看懂代码，但不知道如何从零开始编写",
          "能理解知识点，但不会独立编写程序",
          "不理解题目要求",
          "不知道如何将题目转化为算法",
          "不熟悉C++语法",
          "经常出现编译错误，且不会修改",
          "程序能运行，但输出结果不正确",
          "不知道如何调试程序",
          "不了解时间复杂度与程序效率",
          "其他",
          "暂无"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "暂无"
          ],
          "label": "请具体说明遇到的问题（必填）",
          "placeholder": "例如：哪部分听不懂、哪道题不会、希望怎样讲解……",
          "required_when_visible": true
        },
        "exclusive": [
          "暂无"
        ]
      },
      {
        "id": "s1q5",
        "number": 5,
        "title": "你目前平均每天用于课外自主学习的时间是多少？",
        "type": "single",
        "options": [
          "不足1小时",
          "1—2小时",
          "2—3小时",
          "3—4小时",
          "4小时以上"
        ],
        "required": true
      },
      {
        "id": "s1q6",
        "number": 6,
        "title": "你对自己目前的学习状态如何评价？",
        "type": "single",
        "options": [
          "状态很好，能够主动学习并完成计划",
          "状态较好，基本能够完成学习任务",
          "状态一般，偶尔拖延",
          "状态较差，学习动力不足",
          "状态很差，暂时找不到适合自己的学习节奏"
        ],
        "required": true
      },
      {
        "id": "s1q7",
        "number": 7,
        "title": "你有没有其他问题需要导航员和生涯讲师解决？",
        "type": "text",
        "options": [],
        "required": false
      }
    ]
  },
  {
    "id": "s2",
    "name": "实验室、科研及学科竞赛方面",
    "questions": [
      {
        "id": "s2q1",
        "number": 1,
        "title": "请问当前参与的学校实验室培训有什么？",
        "type": "multi",
        "options": [
          "飞行器创新实验室",
          "电子设计实验室",
          "Robocup 创新实验室",
          "深度学习与边缘智能实验室",
          "程序设计创新实验室",
          "智能机器人实验室",
          "RoboMaster机器人创新实验室WDR战队",
          "未参加"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "未参加"
          ],
          "label": "请填写当前学习进度（必填）",
          "placeholder": "可以简要写下你的进度、想法或需要的帮助……",
          "required_when_visible": true
        },
        "exclusive": [
          "未参加"
        ]
      },
      {
        "id": "s2q2",
        "number": 2,
        "title": "是否有参与科研想法？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写当前的科研想法（必填）",
          "placeholder": "可以简要写下你的进度、想法或需要的帮助……",
          "required_when_visible": true
        }
      },
      {
        "id": "s2q3",
        "number": 3,
        "title": "是否参与了学科竞赛？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写当前参与的竞赛（必填）",
          "placeholder": "可以简要写下你的进度、想法或需要的帮助……",
          "required_when_visible": true
        }
      },
      {
        "id": "s2q4",
        "number": 4,
        "title": "是否已经找到了自己感兴趣方向？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写感兴趣的方向或想法（必填）",
          "placeholder": "可以简要写下你的进度、想法或需要的帮助……",
          "required_when_visible": true
        }
      },
      {
        "id": "s2q5",
        "number": 5,
        "title": "上一次学长方向的内容是否有不懂的地方？",
        "type": "multi",
        "options": [
          "如何正确写报告",
          "如何正确使用AI",
          "如何使用github",
          "实验室应当如何选择",
          "竞赛应当如何选择",
          "导师和课题应该怎么找",
          "大创应该如何选择",
          "软著、专利和论文要怎么搞",
          "各式各样的活动应该怎么参加",
          "暂无"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "暂无"
          ],
          "label": "请具体说明没听懂的问题（必填）",
          "placeholder": "可以简要写下你的进度、想法或需要的帮助……",
          "required_when_visible": true
        },
        "exclusive": [
          "暂无"
        ]
      },
      {
        "id": "s2q6",
        "number": 6,
        "title": "如果学长有项目，愿不愿意参加？",
        "type": "single",
        "options": [
          "愿意参加学长的嵌入式项目",
          "愿意参加学长的网站开发项目",
          "愿意参加学长的游戏开发（第五人格）项目",
          "愿意参加学长的agent开发项目",
          "不愿意"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "不愿意"
          ],
          "label": "请说明自己在相关项目中的优势（必填）",
          "placeholder": "可以简要写下你的进度、想法或需要的帮助……",
          "required_when_visible": true
        }
      },
      {
        "id": "s2q7",
        "number": 7,
        "title": "有无其他问题以及是否需要帮助？",
        "type": "text",
        "options": [],
        "required": false
      }
    ]
  },
  {
    "id": "s3",
    "name": "文体活动参与和生活适应及身心状态方面",
    "questions": [
      {
        "id": "s3q1",
        "number": 1,
        "title": "你目前是否参加了班级的干部组织？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写目前担任的班级职务（必填）",
          "placeholder": "请根据实际情况补充说明……",
          "required_when_visible": true
        }
      },
      {
        "id": "s3q2",
        "number": 2,
        "title": "你目前是否参加了学院学校的学生组织？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写目前参与的学生组织及职务（必填）",
          "placeholder": "请根据实际情况补充说明……",
          "required_when_visible": true
        }
      },
      {
        "id": "s3q3",
        "number": 3,
        "title": "你是否参加校园了体育活动？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写目前参加的体育活动（必填）",
          "placeholder": "请根据实际情况补充说明……",
          "required_when_visible": true
        }
      },
      {
        "id": "s3q4",
        "number": 4,
        "title": "你是否参加校园了文体活动？",
        "type": "single",
        "options": [
          "是",
          "否"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "否"
          ],
          "label": "请填写目前参加的文体活动（必填）",
          "placeholder": "请根据实际情况补充说明……",
          "required_when_visible": true
        }
      },
      {
        "id": "s3q5",
        "number": 5,
        "title": "你当前完成校园跑次数多少？",
        "type": "text",
        "options": [],
        "required": true
      },
      {
        "id": "s3q6",
        "number": 6,
        "title": "对于体育文体活动，有没有什么其他问题需要帮助？",
        "type": "text",
        "options": [],
        "required": false
      },
      {
        "id": "s3q7",
        "number": 7,
        "title": "你目前对大学生活的整体适应情况如何？",
        "type": "single",
        "options": [
          "非常适应",
          "比较适应",
          "一般",
          "不太适应",
          "非常不适应"
        ],
        "required": true
      },
      {
        "id": "s3q8",
        "number": 8,
        "title": "你认为自己目前的时间管理情况如何？",
        "type": "single",
        "options": [
          "能够合理安排学习、休息和活动",
          "基本能够安排好时间",
          "偶尔出现时间安排混乱",
          "经常感到时间不够用",
          "尚未形成合理的时间安排习惯"
        ],
        "required": true
      },
      {
        "id": "s3q9",
        "number": 9,
        "title": "你目前的宿舍生活适应情况如何？",
        "type": "single",
        "options": [
          "非常适应",
          "比较适应",
          "一般",
          "不太适应",
          "非常不适应"
        ],
        "required": true
      },
      {
        "id": "s3q10",
        "number": 10,
        "title": "目前宿舍生活中是否存在以下问题？",
        "type": "multi",
        "options": [
          "室友之间作息时间不同",
          "晚上存在噪声，影响休息",
          "宿舍卫生习惯存在差异",
          "宿舍学习氛围不理想",
          "室友之间沟通不够顺畅",
          "宿舍设施存在问题",
          "宿舍环境影响学习或生活",
          "其他",
          "暂无明显问题"
        ],
        "required": true,
        "exclusive": [
          "暂无明显问题"
        ]
      },
      {
        "id": "s3q11",
        "number": 11,
        "title": "你目前在人际交往方面的适应情况如何？",
        "type": "single",
        "options": [
          "很好，已经建立比较稳定的朋友圈",
          "较好，能够正常与同学交流",
          "一般，还在逐渐熟悉同学",
          "不太适应，主动交流比较困难",
          "存在一定困扰，希望得到帮助"
        ],
        "required": true
      },
      {
        "id": "s3q12",
        "number": 12,
        "title": "你近期主要面临哪些生活方面的困扰？",
        "type": "multi",
        "options": [
          "学习压力较大",
          "作息不规律",
          "饮食不习惯",
          "宿舍生活不适应",
          "与室友或同学相处存在困难",
          "课余生活比较单调",
          "缺少朋友或交流伙伴",
          "对未来大学生活感到迷茫",
          "生活费用安排存在困难",
          "其他",
          "暂无明显困扰"
        ],
        "required": true,
        "exclusive": [
          "暂无明显困扰"
        ]
      },
      {
        "id": "s3q13",
        "number": 13,
        "title": "你对班级班委是否满意？",
        "type": "single",
        "options": [
          "全部非常满意",
          "有部分不满意"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "全部非常满意"
          ],
          "label": "请说明具体不满意的方面（必填）",
          "placeholder": "请根据实际情况补充说明……",
          "required_when_visible": true
        }
      },
      {
        "id": "s3q14",
        "number": 14,
        "title": "你对于导航员、生涯讲师的工作是否满意？",
        "type": "single",
        "options": [
          "全部非常满意",
          "有部分不满意"
        ],
        "required": true,
        "followup": {
          "when": "not-none",
          "exclusive": [
            "全部非常满意"
          ],
          "label": "请说明具体不满意的方面（必填）",
          "placeholder": "请根据实际情况补充说明……",
          "required_when_visible": true
        }
      },
      {
        "id": "s3q15",
        "number": 15,
        "title": "对于导航员、生涯讲师的工作有没有什么建议？",
        "type": "text",
        "options": [],
        "required": false
      },
      {
        "id": "s3q16",
        "number": 16,
        "title": "对目前的大学生活，你还有哪些问题、困难或建议希望向导航员反映？",
        "type": "text",
        "options": [],
        "required": false
      }
    ]
  }
];
