import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { DownOutlined } from '@ant-design/icons';
import {Dropdown, Menu, Space, Typography} from 'antd';
import {
    selectPlatform,
    addTag,
    selectSort,
    removeTag,
    getCurrentTagsState,
    getCurrentPlatformState, getCurrentSortState
} from '../features/games/gamesSlice'
const { Paragraph } = Typography;

const filters = {
    platform: ['pc', 'browser', 'all'],
    category: ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'],
    sort_by: ['alphabetical', 'release-date', 'popularity', 'relevance']
}

const items = [
    // {
    //     label: 'Platform',
    //     key: 'platform',
    //     children: [
    //         {
    //             label: 'pc',
    //             key: 'pc',
    //         },
    //         {
    //             label: 'browser',
    //             key: 'browser',
    //         },
    //         {
    //             label: 'all',
    //             key: 'all',
    //         },
    //     ]
    // },
]

function createItems () {
    for (const [filter, filter_data] of Object.entries(filters)) {
        const children = []
        filter_data.forEach((item) => {
            children.push({
                label: item,
                key: item
            })
        })
        items.push({
            label: filter,
            key: filter,
            items: children
        })
    }
}

createItems()

function GameFilters(){
    const currentTags = useSelector(getCurrentTagsState)
    const currentPlatform = useSelector(getCurrentPlatformState)
    const currentSort = useSelector(getCurrentSortState)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    return (
        <Paragraph>
            <Menu
                mode='horizontal'
                trigger='hover'
            >
                <Menu.Item
                    key='platform'
                >
                    <Dropdown
                        menu={{
                            items: [...items[0].items],
                            selectedKeys: currentPlatform,
                            selectable: true,
                            onSelect: (e) => dispatch(selectPlatform(e.key))
                        }}
                    >
                        <Typography.Link>
                            <Space>
                                Platform
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item
                    key='category'
                >
                    <Dropdown
                        menu={{
                            items: [...items[1].items],
                            selectedKeys: currentTags,
                            selectable: true,
                            multiple: true,
                            onSelect: (e) => dispatch(addTag(e.key)),
                            onDeselect: (e) => dispatch(removeTag(e.key)),
                            className: 'dropdownFilter'
                        }}
                        onOpenChange={handleOpenChange}
                        open={open}

                    >
                        <Typography.Link>
                            <Space>
                                Category
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item
                    key='sort_by'
                >
                    <Dropdown
                        menu={{
                            items: [...items[2].items],
                            selectedKeys: currentSort,
                            selectable: true,
                            onSelect: (e) => dispatch(selectSort(e.key))
                        }}
                    >
                        <Typography.Link>
                            <Space>
                                Sort By
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </Paragraph>
    )
}

export default GameFilters