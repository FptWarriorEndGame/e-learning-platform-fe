/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeNode } from "../types/treeNode.type"



class ObjectTreeHelper {
 
    getInitialCheckedKeys(treeData: TreeNode[]): string[] {
        const checkedKeys: string[] = []
        function checkNode(node: TreeNode) {
          if (node.checked) {
            checkedKeys.push(node.key)
          }
          if (node.children) {
            node.children.forEach(checkNode)
          }
        }
        treeData.forEach(checkNode)
        return checkedKeys
      }
    getInitialExpandedKeys(treeData: TreeNode[]): string[] {
        const expandedKeys: string[] = []
        function checkNode(node: TreeNode) {
          if (node.expanded) {
            expandedKeys.push(node.key)
          }
          if (node.children) {
            node.children.forEach(checkNode)
          }
        }
        treeData.forEach(checkNode)
        return expandedKeys
      }

      createNodeData(node: TreeNode, checkKeyMaps: React.Key[]): TreeNode {
        const nodeData: TreeNode = {
          title: node.title,
          key: node.key,
          expanded: node.isExpanded,
          children: node.children?.map((child) => this.createNodeData(child, checkKeyMaps)),
        }
    
        // Check if any child node is checked
        let isAnyChildChecked = node.children?.some((child) => child.isChecked)
    
        if (node.level === 0) {
          // add code for root level 0 (root node)
    
          nodeData['code'] = (node.origin as any).code
          const listNodeLevel1 = node.children
          isAnyChildChecked = listNodeLevel1?.some((child) => child.isChecked)
          // Trong trường hợp node Level 1 không có check.


          if (!isAnyChildChecked) {
            for (const nodeLevel1Item of listNodeLevel1 ?? []) {
              const listNodeLevel2 = nodeLevel1Item.children
    
              // Kiểm tra checked trong node Level 2
              isAnyChildChecked = listNodeLevel2?.some((child) => child.isChecked)
              if (isAnyChildChecked) {
                break
              }
            }
          }
        }
  
        if (node.isChecked || checkKeyMaps?.includes(node.key)) {
          nodeData['checked'] = true
        }else {
          nodeData['checked'] = false
        }
    
        if (isAnyChildChecked) {
          nodeData['parentChecked'] = true
        } else {
          nodeData['parentChecked'] = false
        }
    
        // Additional properties can be added here as needed
        if (node.isLeaf) {
          nodeData['isLeaf'] = true
        }else {
          nodeData['isLeaf'] = false
        }
    
        return nodeData
      }

}


export const objectTreeHelper = new ObjectTreeHelper();